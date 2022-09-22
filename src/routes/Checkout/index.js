import { useContext } from 'react';

import CheckoutItem from './../../components/CheckoutItem';
import { CartContext } from './../../context/CartContext';
import './index.scss';

const headerTitles = ['Product', 'Description', 'Quantity', 'Price', 'Remove'];

export default function Checkout() {
  const { cartItems, cartTotal } = useContext(CartContext);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        {headerTitles.map((title, index) => (
          <div key={`checkout-title-0${index}`} className="header-block">
            <span>{title}</span>
          </div>
        ))}
      </div>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <span className="total">Total: ${cartTotal}</span>
    </div>
  );
}
