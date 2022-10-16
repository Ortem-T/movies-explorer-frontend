import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

import { API_URL, getTimeFromMins } from '../../utils/const';


function MoviesCard({ movie, userMovies, handleDeleteMovie, handleSaveMovie }) {
  const location = useLocation();
  const imgUrl = location.pathname === "/movies" ? `${API_URL}${movie.image.url}` : `${movie.image}`;
  const isLiked = (userMovies && userMovies.length > 0)
    && userMovies.some((i) => i.movieId === movie.id);
  const likeButtonClassName = `movie__like ${isLiked && 'movie__like_active'}`;
  const userMovie = (userMovies && userMovies.length > 0)
    && userMovies.find((i) => i.movieId === movie.id);

  function handleToogleClick() {
    if (isLiked) {
      handleDeleteMovie(userMovie);
    } else {
      handleSaveMovie(movie);
    }
  }

  function handleDeleteClick() {
    handleDeleteMovie(movie);
  }

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
            className={likeButtonClassName}
            type='submit'
            aria-label={
              isLiked
                ? 'Удалить фильм из сохранённых фильмов'
                : 'Добавить фильм в сохранённые фильмы'
            }
            onClick={handleToogleClick}
          />
        ) : (
          <button
            className='movie__delete'
            type='submit'
            aria-label='Удалить фильм из сохранённых фильмов'
            onClick={handleDeleteClick}
          />
        )}
      </div>
    </li>
  );
}

export default MoviesCard;