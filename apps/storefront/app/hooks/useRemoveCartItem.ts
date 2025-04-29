import { StoreCart, StoreCartLineItem } from '@medusajs/types';
import { useFetcher } from '@remix-run/react';

export const useRemoveCartItem = () => {
  const fetcher = useFetcher<{ cart: StoreCart }>();

  const submit = ({ id: lineItemId }: StoreCartLineItem) => {
    fetcher.submit({ lineItemId }, { method: 'delete', action: '/api/cart/line-items/delete' });
  };

  return { fetcher, state: fetcher.state, submit };
};
