import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies, searchResults, limitMovies, checked, handleMoreMovies }) {
  const location = useLocation();
  const elseButton = searchResults.length > limitMovies;
  return location.pathname === "/movies" ? (
    <section className='movies__cards' aria-label='Фильмы'>
      <ul className='movies__list'>
        {(movies && movies.length > 0) ? movies.map(movie => (
          <MoviesCard
            key={movie.id}
            movie={movie}
          />
        )) : (
          <p className='movies__not-found'>Ничего не найдено</p>
        )}
      </ul>
      {elseButton && !checked && <button
        className='movies__button'
        type='button'
        aria-label='Ещё фильмы'
        onClick={handleMoreMovies}
      >
        Ещё
      </button>}
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