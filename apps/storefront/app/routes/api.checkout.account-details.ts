import { zodResolver } from '@hookform/resolvers/zod';
import { updateGuestAccountDetails } from '@libs/util/server/checkout.server';
import type { ActionFunctionArgs } from '@remix-run/node';
import { data as remixData } from '@remix-run/node';
import { getValidatedFormData } from 'remix-hook-form';
import { z } from 'zod';

export const accountDetailsSchema = z.object({
  cartId: z.string(),
  customerId: z.string().optional(),
  email: z.string().email('Please enter a valid email'),
  shippingAddress: z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    company: z.string().optional().nullable(),
    address1: z.string().min(1, 'Address is required'),
    address2: z.string().optional().nullable(),
    city: z.string().min(1, 'City is required'),
    province: z.string().min(1, 'Province is required'),
    countryCode: z.string().min(1, 'Country is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
    phone: z.string().optional().nullable(),
    country: z.string().optional().nullable(),
  }),
  shippingAddressId: z.string(),
  isExpressCheckout: z.boolean().optional(),
});

export type AccountDetailsFormData = z.infer<typeof accountDetailsSchema>;

export async function action(actionArgs: ActionFunctionArgs) {
  const { errors, data } = await getValidatedFormData<AccountDetailsFormData>(
    actionArgs.request,
    zodResolver(accountDetailsSchema),
  );

  if (errors) {
    return remixData({ errors }, { status: 400 });
  }

  const { cart, headers } = await updateGuestAccountDetails(data, actionArgs);
  return remixData({ cart }, { headers });
}
