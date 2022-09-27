import { useDispatch, useSelector } from 'react-redux';

import {
  addItemToCart,
  deleteItemFromCart,
  removeItemFromCart,
} from '../../reducers/cart/actions';
import { cartItemsSelector } from './../../reducers/cart/selector';

import './index.scss';

export default function CheckoutItem({ cartItem }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(cartItemsSelector);
  
  const { name, imageUrl, price, quantity } = cartItem;

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div
          className="arrow"
          onClick={() => dispatch(removeItemFromCart(cartItems, cartItem))}
        >
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div
          className="arrow"
          onClick={() => dispatch(addItemToCart(cartItems, cartItem))}
        >
          &#10095;
        </div>
      </span>
      <span className="price">${price}</span>
      <div
        className="remove-button"
        onClick={() => dispatch(deleteItemFromCart(cartItems, cartItem))}
      >
        &#10005;
      </div>
    </div>
  );
}
