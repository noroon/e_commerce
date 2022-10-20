import CART_ACTION_TYPES, { CartItem } from './types';
import { CategoryItem } from '../categories/types';
import {
  createAction,
  withMatcher,
  ActionWithPayload,
} from '../reducer.utils';

const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem,
): CartItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id,
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem,
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (
  cartItems: CartItem[],
  itemToRemove: CategoryItem,
): CartItem[] => {
  const cartItemToRemove = cartItems.find(
    (cartItem) => cartItem.id === itemToRemove.id,
  );

  if (cartItemToRemove && cartItemToRemove.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === itemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem,
  );
};

const deleteCartItem = (
  cartItems: CartItem[],
  itemToDelete: CartItem,
): CartItem[] => {
  return cartItems.filter((cartItem) => cartItem.id !== itemToDelete.id);
};

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;

export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export const setCartItems = withMatcher((cartItems: CartItem[]) =>
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems),
);

export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen => {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, !boolean);
});

export const addItemToCart = (
  cartItems: CartItem[],
  itemToAdd: CategoryItem,
) => {
  const newCartItems = addCartItem(cartItems, itemToAdd);
  return setCartItems(newCartItems);
};

export const removeItemFromCart = (
  cartItems: CartItem[],
  itemToRemove: CartItem,
) => {
  const newCartItems = removeCartItem(cartItems, itemToRemove);
  return setCartItems(newCartItems);
};

export const deleteItemFromCart = (
  cartItems: CartItem[],
  itemToDelete: CartItem,
) => {
  const newCartItems = deleteCartItem(cartItems, itemToDelete);
  return setCartItems(newCartItems);
};
