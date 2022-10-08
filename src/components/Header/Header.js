import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import BurgerNav from '../BurgerNav/BurgerNav'
import burgerMenu from '../../images/burger.svg';

function Header() {
  const location = useLocation();
  return location.pathname === "/" ? (
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
    <header className='header__login'>
      <div className='header__container header__container-login'>

        <Link to='/' className='header__logo' />

        <Navigation />
        
        <img
          className='header__burger-menu'
          src={burgerMenu}
          alt='Открыть меню'
        />  
      </div>

      <BurgerNav />

    </header>
  );
}

export default Header;