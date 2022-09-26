import { createSelector } from 'reselect';

const selectCartReducer = (state) => state.cart;

export const cartItemsSelector = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems,
);

export const isCartOpenSelector = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen,
);

export const cartCountSelector = createSelector(
  [selectCartReducer],
  ({ cartItems }) => {
    return cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
  },
);

export const cartTotalSelector = createSelector(
  [selectCartReducer],
  ({ cartItems }) => {
    return cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0,
    );
  },
);
