import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../../components/Preloader/Preloader';

function SavedMovies() {
  return (
    <main className='saved-movies'>
      <SearchForm />
      <Preloader />
      <MoviesCardList />
    </main>
  );
}

export default SavedMovies;