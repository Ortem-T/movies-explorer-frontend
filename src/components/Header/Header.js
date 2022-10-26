import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import BurgerNav from '../BurgerNav/BurgerNav'
import burgerMenu from '../../images/burger.svg';
import burgerMenuMain from '../../images/burger_main.svg'

function Header({ loggedIn }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleMenuOpen() {
    setIsMenuOpen(true);
  }

  function handleMenuClose() {
    setIsMenuOpen(false);
  }

  return !loggedIn ? (
    <header className='header'>
      <div className='header__container'>
        <Link to='/' className='header__logo' />
        <nav className='header__menu'>
          <Link to='/signup' className='header__register-link'>
            Регистрация
          </Link>
          <Link to='/signin' className='header__auth-link'>
            Войти
          </Link>
        </nav>
      </div>
    </header>
  ) : (
    <header className={location.pathname === "/" ? 'header' : 'header__login'}>
      <div className={location.pathname === "/" ? 'header__container' : 'header__container header__container-login'}>
        <Link to='/' className='header__logo' />

        <Navigation />

        <img
          className='header__burger-menu'
          src={location.pathname === "/" ? burgerMenuMain : burgerMenu}
          alt='Открыть меню'
          onClick={handleMenuOpen}
        />
      </div>

      {isMenuOpen && <BurgerNav
        handleMenuClose={handleMenuClose}
      />}

    </header>
  );
}

export default Header;