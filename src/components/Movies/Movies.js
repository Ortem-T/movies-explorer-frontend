import { useState, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../../components/Preloader/Preloader';

import {
  SHORT_MOVIE_DURATION,
  FULL_SCREEN,
  MEDIUM_SCREEN,
  SIXTEEN_MOVIES,
  EIGHT_MOVIES,
  FIVE_MOVIES,
  FOUR_MOVIES,
  TWO_MOVIES,
  ONE_MOVIE,
} from '../../utils/const';

function Movies({ movies, userMovies, initialMovies, handleSaveMovie, handleDeleteMovie, handleResultsSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [checked, setChecked] = useState(false);
  const [shortMovies, setShortMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [limitMovies, setLimitMovies] = useState(null);
  const [rowMovies, setRowMovies] = useState(null);
  const [shownMovies, setShownMovies] = useState([]);
  const [shownMoreMovies, setShownMoreMovies] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.screen.width);

  useEffect(() => {
    setChecked(JSON.parse(localStorage.getItem('isShort')));
    setShownMovies(localStorage.resultsSearch ? JSON.parse(localStorage.getItem('resultsSearch')) : initialMovies)
    setSearchTerm(JSON.parse(localStorage.getItem('searchValue')))
  }, [initialMovies]);

  useEffect(() => {
    const filteredShortMovies = shownMovies.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION);
    setShortMovies(filteredShortMovies)
  }, [shownMovies]);

  const handleSearch = (searchValue, isShort) => {
    const filteredMovies = initialMovies.filter((movie) => movie.nameRU.toLowerCase().includes(searchTerm.toLowerCase()))
    setShownMovies(filteredMovies)
    console.log(isShort)
    localStorage.setItem('searchValue', JSON.stringify(searchValue))
    localStorage.setItem('resultsSearch', JSON.stringify(filteredMovies))
    localStorage.setItem('isShort', JSON.stringify(isShort))
    setIsLoading(false)
    filteredMovies.length < 1 && handleResultsSearch()
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    initScreen(screenWidth);
  }, [screenWidth]);

  useEffect(() => {
    setShownMoreMovies(shownMovies.slice(0, limitMovies));
  }, [shownMovies, limitMovies]);

  const initScreen = (width) => {
    if (width > FULL_SCREEN) {
      setLimitMovies(SIXTEEN_MOVIES);
      setRowMovies(FOUR_MOVIES)
    } else if (width < FULL_SCREEN && width >= MEDIUM_SCREEN) {
      setLimitMovies(EIGHT_MOVIES);
      setRowMovies(TWO_MOVIES)
    } else if (width < MEDIUM_SCREEN) {
      setLimitMovies(FIVE_MOVIES);
      setRowMovies(ONE_MOVIE)
    }
  };

  const handleChange = e => {
    setSearchTerm(e.target.value);
  };

  const handleResize = () => {
    setScreenWidth(window.screen.width);
  };

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true)
    handleSearch(searchTerm, checked)
  }

  function handleToogleCheck() {
    setChecked(!checked);
    localStorage.setItem('isShort', JSON.stringify(!checked));
  }

  function handleMoreMovies() {
    setLimitMovies(limitMovies + rowMovies);
  }

  return (
    <main className='movies'>
      <SearchForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        checked={checked}
        handleToogleCheck={handleToogleCheck}
        searchTerm={searchTerm}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          handleMoreMovies={handleMoreMovies}
          handleSaveMovie={handleSaveMovie}
          handleDeleteMovie={handleDeleteMovie}
          allMovies={shownMovies}
          movies={checked ? shortMovies : shownMoreMovies}
          userMovies={userMovies}
          limitMovies={limitMovies}
        />
      )}
    </main>
  );
}

export default Movies;