import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

import Button from '../Button';
import './index.scss';

export default function ProductCard({ product }) {
  const { addItemToCart } = useContext(CartContext);
  const { name, price, imageUrl } = product;

  const addToCart = () => addItemToCart(product);

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
