import { NavigationCollection, NavigationItemLocation } from "@libs/types";

export const headerNavigationItems: NavigationCollection = [
  {
    id: 4,
    label: "Collections",
    url: "/collections/floral-collection",
    sort_order: 0,
    location: NavigationItemLocation.header,
    new_tab: false,
  },
  {
    id: 1,
    label: "Work",
    url: "/categories/products",
    sort_order: 0,
    location: NavigationItemLocation.header,
    new_tab: false,
  },
  {
    id: 3,
    label: "About Tammy",
    url: "/about",
    sort_order: 1,
    location: NavigationItemLocation.header,
    new_tab: false,
  },
  {
    id: 2,
    label: "Shop All",
    url: "/products",
    sort_order: 1,
    location: NavigationItemLocation.header,
    new_tab: false,
  },
];

export const footerNavigationItems: NavigationCollection = [
  {
    id: 1,
    label: "Shop All",
    url: "/products",
    location: NavigationItemLocation.footer,
    sort_order: 1,
    new_tab: false,
  },
  {
    id: 2,
    label: "Cities",
    url: "/collections/cities-collection",
    location: NavigationItemLocation.footer,
    sort_order: 1,
    new_tab: false,
  },
  {
    id: 3,
    label: "Floral",
    url: "/collections/floral-collection",
    location: NavigationItemLocation.footer,
    sort_order: 1,
    new_tab: false,
  },
  {
    id: 4,
    label: "Past Work",
    url: "/collections/past-work",
    location: NavigationItemLocation.footer,
    sort_order: 1,
    new_tab: false,
  },
];
