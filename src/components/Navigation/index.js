import { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import CartIcon from './../CartIcon';
import CartDropdown from '../CartDropdown';
import { UserContext } from '../../context/UserContext';
import { CartContext } from '../../context/CartContext';
import { signOutUser } from '../../utils/firebase';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import './index.scss';

export default function Navigation() {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

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
}
