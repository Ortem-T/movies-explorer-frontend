import React from 'react';
import './MoviesCard.css';
import imgCard from '../../images/boys.jpg';

function MoviesCard() {
  return (
    <li className='movie'>
      <div className='movie__item'>
        <img className='movie__image' src={imgCard} alt='Фильм' />
        <h2 className='movie__title'>
          33 слова о дизайне
        </h2>
        <p className='movie__duration'>1ч42м</p>
        <form className='movie__checkbox'>
          <input
            className='movie__checkbox-input'
            type='checkbox'
            id='movie-checkbox'
            name='movie-checkbox'
            aria-label='Сохранить фильм'
          />
        </form>
      </div>
    </li>
  );
}

export default MoviesCard;