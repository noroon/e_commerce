import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from './../Button';
import CartItem from '../CartItem';
import { CartContext } from '../../context/CartContext';
import './index.scss';

export default function CartDropdown() {
  const { cartItems, setIsCartOpen } = useContext(CartContext);
  const navigate = useNavigate();

  const checkoutHandler = () => {
    setIsCartOpen();
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
