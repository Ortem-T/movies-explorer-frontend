import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {
  const location = useLocation();
  return location.pathname === "/movies" ? (
    <section className='movies__cards' aria-label='Фильмы'>
      <ul className='movies__list'>
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>
      <button
        className='movies__button'
        type='button'
        aria-label='Ещё фильмы'
      >
        Ещё
      </button>
    </section>
  ) : (
    <section className='movies__cards' aria-label='Фильмы'>
      <ul className='movies__list'>
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>
    </section>
  );
}

export default MoviesCardList;