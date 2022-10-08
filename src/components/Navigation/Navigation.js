import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <>
      <nav className='navigation'>
        <ul className='navigation__links'>
          <li>
            <NavLink to='/movies' className='navigation__link navigation__link_active'>
              Фильмы
            </NavLink>
          </li>
          <li>
            <NavLink to='/saved-movies' className='navigation__link'>
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <Link to='/profile' className='navigation__profile-link'>
          Аккаунт
        </Link>
      </nav>
    </>
  );
}

export default Navigation;