import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

import { API_URL, getTimeFromMins } from '../../utils/const';

function MoviesCard({ movie }) {
  const imgUrl = `${API_URL}${movie.image.url}`;
  const location = useLocation();
  // const savedMovie = savedMovies.find((i) => i.movieId === movie.id);
  // const likeButtonClassName = `movie__like ${savedMovie && 'movie__like_active'}`;

  // function handleToogleClick() {
  //   if (savedMovie) {
  //     handleDeleteMovie(savedMovie);
  //   } else {
  //     handleSaveMovie(movie);
  //   }
  // }

  // function handleDeleteClick() {
  //   handleDeleteMovie(movie);
  // }
  return (
    <li className='movie'>
      <div className='movie__item'>
        <a
          href={movie.trailerLink}
          target='_blank'
          className='movie__link'
          aria-label='Посмотреть трейлер фильма'
          rel='noopener noreferrer'
        >
          <img className='movie__image' src={imgUrl} alt='Фильм' />
        </a>
        <h2 title={movie.nameRU} className='movie__title'>
          {movie.nameRU}
        </h2>
        <p className='movie__duration'>{getTimeFromMins(movie.duration)}</p>
        {location.pathname === "/movies" ? (
          <button
            className='movie__like'
            type='submit'
            // aria-label={
            //   savedMovie
            //     ? 'Удалить фильм из сохранённых фильмов'
            //     : 'Добавить фильм в сохранённые фильмы'
            // }
            // onClick={handleToogleClick}
          />
        ) : (
          <button
            className='movie__delete'
            type='submit'
            aria-label='Удалить фильм из сохранённых фильмов'
            // onClick={handleDeleteClick}
          />
        )}
      </div>
    </li>
  );
}

export default MoviesCard;