import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../Button';

import { addItemToCart } from '../../reducers/cart/actions';
import { cartItemsSelector } from '../../reducers/cart/selector';
import { Product } from '../../@types';

import './index.scss';

type ProductCardProps = {
  product: Product;
};

const ProductCard : FC<ProductCardProps>= ({ product }) => {
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
};

export default ProductCard;
