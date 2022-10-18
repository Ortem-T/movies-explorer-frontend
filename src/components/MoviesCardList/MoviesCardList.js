import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({
  movies,
  savedMovies,
  userMovies,
  limitMovies,
  allMovies, checked,
  handleMoreMovies,
  handleSaveMovie,
  handleDeleteMovie
}) {
  const location = useLocation();

  return (
    <section className='movies__cards' aria-label='Фильмы'>
      {location.pathname === "/movies" && <ul className='movies__list'>
        {(movies && movies.length > 0) ? movies.map(movie => (
          <MoviesCard
            key={movie.id}
            movie={movie}
            userMovies={userMovies}
            handleSaveMovie={handleSaveMovie}
            handleDeleteMovie={handleDeleteMovie}
          />
        )) : (
          <p className='movies__not-found'>Ничего не найдено</p>
        )}
      </ul>}
      {location.pathname === "/saved-movies" && <ul className='movies__list'>
        {(savedMovies && savedMovies.length > 0) ? savedMovies.map(movie => (
          <MoviesCard
            key={movie._id}
            movie={movie}
            savedMovies={savedMovies}
            handleDeleteMovie={handleDeleteMovie}
          />
        )) : (
          <p className='movies__not-found'>Ничего не найдено</p>
        )}
      </ul>}
      {location.pathname === "/movies" && allMovies.length > limitMovies && !checked && <button
        className='movies__button'
        type='button'
        aria-label='Ещё фильмы'
        onClick={handleMoreMovies}
      >
        Ещё
      </button>}
    </section>
  )
}

export default MoviesCardList;