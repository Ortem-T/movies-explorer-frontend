import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './BurgerNav.css';
import closeButton from '../../images/close.svg';

function BurgerNav() {
  return (
    <section className='popup'>
      <img
        className='popup__close-button'
        src={closeButton}
        alt='Закрыть'
      />
      <nav className='popup__content'>
        <ul className='popup__links'>
          <li>
            <NavLink
              to='/'
              className='popup__link'
            >
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/movies'
              className='popup__link popup__link_active'
            >
              Фильмы
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/saved-movies'
              className='popup__link'
            >
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>

        <Link to='/profile' className='popup__profile-link'>
          Аккаунт
        </Link>
      </nav>
    </section>
  );
}

export default BurgerNav;