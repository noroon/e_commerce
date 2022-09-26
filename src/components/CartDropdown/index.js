import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Button from './../Button';
import CartItem from '../CartItem';

import {
  cartItemsSelector,
  isCartOpenSelector,
} from '../../reducer/cart/selector';
import { setIsCartOpen } from '../../reducer/cart/action';

import './index.scss';

export default function CartDropdown() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(cartItemsSelector);
  const isCartOpen = useSelector(isCartOpenSelector);

  const checkoutHandler = () => {
    dispatch(setIsCartOpen(isCartOpen));
    navigate('/checkout');
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <Button onClick={checkoutHandler}>GO TO CHECKOUT</Button>
    </div>
  );
}
