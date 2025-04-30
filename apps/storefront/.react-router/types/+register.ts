import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/.well-known/apple-developer-merchantid-domain-association": {};
  "/api/checkout/remove-discount-code": {};
  "/api/checkout/shipping-methods": {};
  "/collections/:collectionHandle": {
    "collectionHandle": string;
  };
  "/api/checkout/account-details": {};
  "/api/checkout/billing-address": {};
  "/api/newsletter-subscriptions": {};
  "/api/cart/line-items/create": {};
  "/api/cart/line-items/delete": {};
  "/api/cart/line-items/update": {};
  "/api/checkout/discount-code": {};
  "/api/product-reviews/upsert": {};
  "/categories/:categoryHandle": {
    "categoryHandle": string;
  };
  "/sitemap-collections.xml": {};
  "/api/checkout/contact-info": {};
  "/orders/:orderId/reviews": {
    "orderId": string;
  };
  "/products/:productHandle": {
    "productHandle": string;
  };
  "/sitemap-products.xml": {};
  "/api/checkout/complete": {};
  "/api/checkout/express": {};
  "/sitemap-pages.xml": {};
  "/checkout/success": {};
  "/api/health/live": {};
  "/checkout": {};
  "/products": {};
  "/favicon.ico": {};
  "/sitemap.xml": {};
  "/api/page-data": {};
  "/robots.txt": {};
  "/api/region": {};
  "/about-us": {};
  "/*": {
    "*": string;
  };
};