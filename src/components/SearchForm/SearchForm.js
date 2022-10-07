import React from 'react';

import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <section className='search' aria-label='Форма поиска'>
      <form className='search-form'>
        <label className='search-form__label'></label>
        <input
          className='search-form__input'
          type='text'
          name='search'
          id='search'
          placeholder='Фильм'
          aria-label='Введите название фильма'
        />
        <span className='search-form__error'></span>
        <button className='search-form__button' type='submit' aria-label='Найти фильм' />
      </form>

      <FilterCheckbox  />
    </section>
  );
}

export default SearchForm;