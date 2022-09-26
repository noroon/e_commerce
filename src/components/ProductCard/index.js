import { useDispatch, useSelector } from 'react-redux';

import { addItemToCart } from '../../reducer/cart/action';
import { cartItemsSelector } from './../../reducer/cart/selector';

import Button from '../Button';
import './index.scss';

export default function ProductCard({ product }) {
  const { name, price, imageUrl } = product;

  const dispatch = useDispatch();
  const cartItems = useSelector(cartItemsSelector);

  const addToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={addToCart}>
        Add to cart
      </Button>
    </div>
  );
}
