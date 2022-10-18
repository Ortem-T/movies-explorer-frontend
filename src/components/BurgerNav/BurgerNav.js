import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './BurgerNav.css';
import closeButton from '../../images/close.svg';

function BurgerNav({ handleMenuClose }) {
  const location = useLocation();

  return (
    <section className='popup'>
      <img
        className='popup__close-button'
        src={closeButton}
        alt='Закрыть'
        onClick={handleMenuClose}
      />
      <nav className='popup__content'>
        <ul className='popup__links'>
          <li>
            <NavLink
              to='/'
              className={location.pathname === "/" ? 'popup__link popup__link_active' : 'popup__link'}
              onClick={handleMenuClose}
            >
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/movies'
              className={location.pathname === "/movies" ? 'popup__link popup__link_active' : 'popup__link'}
              onClick={handleMenuClose}
            >
              Фильмы
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/saved-movies'
              className={location.pathname === "/saved-movies" ? 'popup__link popup__link_active' : 'popup__link'}
              onClick={handleMenuClose}
            >
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <Link
          to='/profile'
          className='popup__profile-link'
          onClick={handleMenuClose}
        >
          Аккаунт
        </Link>
      </nav>
    </section>
  );
}

export default BurgerNav;