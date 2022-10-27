import { loadStripe } from '@stripe/stripe-js';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_STRIPE_PUBLISHABLE_KEY: string;
    }
  }
}

export const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY,
);
