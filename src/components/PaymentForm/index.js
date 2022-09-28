import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import Button from '../Button';

import { cartTotalSelector } from '../../reducers/cart/selector';
import { currentUserSelector } from '../../reducers/user/selector';

import './index.scss';

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(cartTotalSelector);
  const currentUser = useSelector(currentUserSelector);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessingPayment(true);

    const res = await fetch('/.netlify/functions/createPaymentIntent', {
      method: 'post',
      heather: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json());

    const {
      paymentIntent: { client_secret: clientSecret },
    } = res;

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : 'Guest',
        },
      },
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error);
    } else if (paymentResult.paymentIntent.status === 'succeeded') {
      alert('Payment Successful');
    }
  };

  return (
    <div className="payment-form-container">
      <form className="payment-form" onSubmit={handleSubmit}>
        <h2>Credit Card Payment</h2>
        <CardElement />
        <Button isLoading={isProcessingPayment} buttonType="inverted">
          Pay now
        </Button>
      </form>
    </div>
  );
}
