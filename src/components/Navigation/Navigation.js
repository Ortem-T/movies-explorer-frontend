import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const location = useLocation();
  const mainLink = location.pathname === "/" ? 'navigation__link navigation__link-main' : 'navigation__link'
  const profLink = location.pathname === "/" ? 'navigation__profile-link navigation__profile-link-main' : 'navigation__profile-link'
  const moviesLink = location.pathname === "/movies" && 'navigation__link_active'
  const savedLink = location.pathname === "/saved-movies" && 'navigation__link_active'

  return (
    <>
      <nav className='navigation'>
        <ul className='navigation__links'>
          <li>
            <NavLink to='/movies' className={`${mainLink} ${moviesLink}`}>
              Фильмы
            </NavLink>
          </li>
          <li>
            <NavLink to='/saved-movies' className={`${mainLink} ${savedLink}`}>
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <Link to='/profile' className={profLink}>
          Аккаунт
        </Link>
      </nav>
    </>
  );
}

export default Navigation;