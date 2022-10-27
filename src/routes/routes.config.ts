import { Home, Shop, Authentication, Checkout } from '.';

export const routes = [
  {
    path: '',
    element: Home,
  },
  {
    path: 'shop/*',
    element: Shop,
  },
  {
    path: 'auth',
    element: Authentication,
  },
  {
    path: 'checkout',
    element: Checkout,
  },
];
