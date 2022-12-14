import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ checked, handleToogleCheck }) {
  return (
    <form className='checkbox'>
      <input
        className='checkbox__input'
        type='checkbox'
        id='checkbox'
        name='checkbox'
        aria-label='Найти короткометражки'
        checked={checked}
        onChange={handleToogleCheck}
      />
      <label className='checkbox__label' htmlFor='checkbox'>
        Короткометражки
      </label>
    </form>
  );
}

export default FilterCheckbox;