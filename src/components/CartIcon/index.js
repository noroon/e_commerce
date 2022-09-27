import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import {
  cartCountSelector,
  isCartOpenSelector,
} from '../../reducers/cart/selector';
import { setIsCartOpen } from '../../reducers/cart/actions';

import './index.scss';

export default function CartIcon() {
  const dispatch = useDispatch();

  const cartCount = useSelector(cartCountSelector);
  const isCartOpen = useSelector(isCartOpenSelector);

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(isCartOpen));

  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
}
