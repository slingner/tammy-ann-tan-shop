import { Container } from "@app/components/common/container";
import { ProductListWithPagination } from "@app/components/product/ProductListWithPagination";
import { PageHeading } from "@app/components/sections/PageHeading";
import { fetchCollections } from "@libs/util/server/data/collections.server";
import { fetchProducts } from "@libs/util/server/products.server";
import clsx from "clsx";
import { LoaderFunctionArgs, redirect } from "react-router";
import { NavLink, useLoaderData } from "react-router";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { collections } = await fetchCollections();

  // If no collection handle, return all collections for the index page
  if (!params.collectionHandle) {
    return { collections };
  }

  // Handle specific collection
  const collection = collections?.find(
    (collection) => collection.handle === params.collectionHandle
  );

  if (!collection) throw redirect("/collections");

  const { products, count, limit, offset } = await fetchProducts(request, {
    collection_id: collection.id,
  });

  return { products, count, limit, offset, collections, collection };
};

export default function CollectionsRoute() {
  const data = useLoaderData<typeof loader>();

  // Handle the index page (/collections)
  if (!("collection" in data)) {
    return (
      <Container className='py-16'>
        <PageHeading className='text-center text-5xl font-ballet mb-8'>
          Our Collections
        </PageHeading>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {data.collections.map((collection) => (
            <div key={collection.id} className='border rounded-lg p-4'>
              <img
                src={
                  collection.products?.[0]?.images?.[0]?.url ??
                  "/placeholder-image.jpg"
                }
                alt={collection.title}
                className='w-full h-48 object-cover rounded-md'
              />
              <h2 className='text-2xl font-bold mt-4'>{collection.title}</h2>
              <NavLink
                to={`/collections/${collection.handle}`}
                className='text-primary mt-4 inline-block'
              >
                View Collection
              </NavLink>
            </div>
          ))}
        </div>
      </Container>
    );
  }

  // Handle individual collection page
  const { products, count, limit, offset, collections, collection } = data;

  return (
    <Container className='pb-16'>
      <PageHeading className='w-full text-center text-5xl xs:text-6xl md:text-8xl font-ballet mt-24 font-normal lg:font-normal'>
        {collection?.title}
      </PageHeading>

      {collections.length > 1 && (
        <div className='flex flex-col w-full items-center'>
          <div className='flex-1'>
            <div className='inline-flex gap-5 text-2xl font-italiana border-b border-primary mt-4 mb-8'>
              {collections.map((collection) => (
                <NavLink
                  to={`/collections/${collection.handle}`}
                  key={collection.id}
                  className={({ isActive }) =>
                    clsx("h-full p-4", {
                      "font-bold border-b-2 border-primary": isActive,
                      "!border-none active:": !isActive,
                    })
                  }
                >
                  {collection.title}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className='flex flex-col gap-4 sm:flex-row'>
        <div className='flex-1'>
          <ProductListWithPagination
            products={products}
            paginationConfig={{
              count: count ?? 0,
              limit: limit ?? 12,
              offset: offset ?? 0,
            }}
            context='products'
          />
        </div>
      </div>
    </Container>
  );
}
