import { z } from 'zod';
import { data } from '@remix-run/node';
import { getValidatedFormData } from 'remix-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { upsertProductReviews } from '@libs/util/server/data/product-reviews.server';
import { createReadStream } from 'fs';
import { baseMedusaConfig } from '@libs/util/server/client.server';
import type { NodeOnDiskFile } from '@remix-run/node';
import { StoreUpsertProductReviewsDTO } from '@lambdacurry/medusa-plugins-sdk';

const schema = z.object({
  id: z.string().optional(),
  order_id: z.string().min(1, 'Order is required'),
  order_line_item_id: z.string().min(1, 'Line item is required'),
  rating: z.number().min(1, 'Rating is required'),
  content: z.string().optional().default(''),
  existing_images: z.string().optional(),
  review_request_id: z.string().optional(),
});

const uploadImages = async (_images: NodeOnDiskFile | NodeOnDiskFile[] | null | undefined): Promise<string[]> => {
  if (!_images) return [];
  if (_images && !Array.isArray(_images)) _images = [_images];
  if (!Array.isArray(_images)) return [];
  if (!_images?.length) return [];
  const images = _images.filter((image) => image.size > 0);
  if (!images.length) return [];

  const formData = new FormData();

  for (const image of images) {
    const fileBuffer = await readFileAsBuffer(image.getFilePath());
    const blob = new Blob([fileBuffer], { type: image.type || 'application/octet-stream' });
    formData.append('files', blob, image.name);
  }

  const url = new URL('/store/product-reviews/uploads', baseMedusaConfig.baseUrl);

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
    headers: {
      'x-publishable-api-key': baseMedusaConfig.publishableKey ?? '',
    },
  });

  if (!response.ok) {
    console.error('Upload failed with status:', response.status);
    const errorText = await response.text();
    console.error('Error details:', errorText);
    return [];
  }

  const data = (await response.json()) as { files: { id: string; url: string }[] };

  return data.files.map((i) => i.url);
};

async function readFileAsBuffer(filePath: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    const stream = createReadStream(filePath);

    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on('error', (err) => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
  });
}

export async function action({ request }: { request: Request }) {
  const { errors, data: formData, receivedValues } = await getValidatedFormData(request, zodResolver(schema));

  if (errors) {
    return data({ errors }, { status: 400 });
  }

  try {
    const { existing_images, ...upsertPayload } = formData;

    const formDataObj = await request.formData();
    const images = formDataObj.getAll('images') as unknown as NodeOnDiskFile[];

    const newImageUrls = await uploadImages(images);

    const existingImageUrls = existing_images?.split(',').map((url: string) => url.trim()) || [];

    const allImageUrls = [...newImageUrls, ...existingImageUrls];

    const { product_reviews } = await upsertProductReviews(request, {
      reviews: [
        {
          ...upsertPayload,
          images: allImageUrls.map((url: string) => ({ url })),
        },
      ] as StoreUpsertProductReviewsDTO['reviews'],
    });

    return data({ product_reviews });
  } catch (error: any) {
    console.error('product reviews error', error);
    return data(
      { errors: { root: { message: 'Something went wrong when creating or updating your product reviews.' } } },
      { status: 500 },
    );
  }
}
