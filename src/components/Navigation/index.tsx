import { Outlet, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import CartIcon from '../CartIcon';
import CartDropdown from '../CartDropdown';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import { currentUserSelector } from '../../reducers/user/selector';
import { isCartOpenSelector } from '../../reducers/cart/selector';
import { signOutRequest } from '../../reducers/user/actions';

import './index.scss';

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserSelector);
  const isCartOpen = useSelector(isCartOpenSelector);

  const signOutUser = () => dispatch(signOutRequest());
  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
