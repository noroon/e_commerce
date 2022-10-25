import { FC } from 'react';

import { CartItemProps } from '../../@types';

import './index.scss';

const CartItem: FC<CartItemProps> = ({
  cartItem: { name, imageUrl, price, quantity },
}) => {
  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="item-details">
        <span className="name">{name}</span>
        {quantity > 1 && (
          <span className="price">
            {quantity} x ${price}
          </span>
        )}
        <span className="sum">{`$${quantity * price}`}</span>
      </div>
    </div>
  );
};

export default CartItem;
