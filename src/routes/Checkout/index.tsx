import { useSelector } from 'react-redux';

import CheckoutItem from '../../components/CheckoutItem';
import PaymentForm from '../../components/PaymentForm';

import {
  cartItemsSelector,
  cartTotalSelector,
} from '../../reducers/cart/selector';

import './index.scss';

const headerTitles = ['Product', 'Description', 'Quantity', 'Price', 'Remove'];

const Checkout = () => {
  const cartItems = useSelector(cartItemsSelector);
  const cartTotal = useSelector(cartTotalSelector);

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
      <PaymentForm />
    </div>
  );
};

export default Checkout;
