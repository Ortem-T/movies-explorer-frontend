import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../../components/Preloader/Preloader';

function Movies() {
  return (
    <main className='movies'>
      <SearchForm />
      <Preloader />
      <MoviesCardList />
    </main>
  );
}

export default Movies;