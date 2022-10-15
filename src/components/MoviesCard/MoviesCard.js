import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

import { API_URL, getTimeFromMins } from '../../utils/const';
import * as api from '../../utils/MainApi';

function MoviesCard({ movie, allMovies, handleDeleteMovie }) {
  const [addMovies, setAddMovies] = useState([]);
  const location = useLocation();
  const imgUrl = location.pathname === "/movies" ? `${API_URL}${movie.image.url}` : `${movie.image}`;
  const savedMovie = allMovies.find((i) => i.movieId === movie.id);
  console.log(allMovies)
  console.log(savedMovie)
  // const likeButtonClassName = `movie__like ${savedMovie && 'movie__like_active'}`;

  function handleSaveMovie(movie) {
    console.log(movie)
    api
      .addMovie(movie)
      .then((newMovie) => {
        console.log(newMovie)
        setAddMovies([newMovie, ...addMovies]);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

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
            // className={likeButtonClassName}
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