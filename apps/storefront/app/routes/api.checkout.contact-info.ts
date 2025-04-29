import { z } from 'zod';
import { data as remixData } from '@remix-run/node';
import { getValidatedFormData } from 'remix-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateCart } from '@libs/util/server/data/cart.server';
import type { ActionFunctionArgs } from '@remix-run/node';

export const contactInfoSchema = z.object({
  cartId: z.string(),
  email: z.string().email('Please enter a valid email'),
});

export type ContactInfoFormData = z.infer<typeof contactInfoSchema>;

export async function action(actionArgs: ActionFunctionArgs) {
  const { errors, data } = await getValidatedFormData<ContactInfoFormData>(
    actionArgs.request,
    zodResolver(contactInfoSchema),
  );

  if (errors) {
    return remixData({ errors }, { status: 400 });
  }

  const { cart } = await updateCart(actionArgs.request, {
    email: data.email,
  });

  return remixData({ cart });
}
