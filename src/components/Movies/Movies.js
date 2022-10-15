import { useState, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../../components/Preloader/Preloader';

import * as moviesApi from '../../utils/MoviesApi';

function Movies({ handleSaveMovie, userMovies, handleDeleteMovie }) {
  const [movies, setMovies] = useState([]);
  const [initialMovies, setInitialMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [checked, setChecked] = useState(false);
  const [shortMovies, setShortMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [limitMovies, setLimitMovies] = useState(null);
  const [rowMovies, setRowMovies] = useState(null);
  const [shownMovies, setShownMovies] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.screen.width);

  useEffect(() => {
    moviesApi
      .getMovies()
      .then((data) => {
        setMovies(localStorage.resultsSearch ? JSON.parse(localStorage.getItem('resultsSearch')) : data);
        setInitialMovies(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  // useEffect(() => {
  //   setMovies(JSON.parse(localStorage.getItem('resultsSearch')));
  //   setChecked(JSON.parse(localStorage.getItem('isShort')));
  // }, [])

  const handleSearch = (searchValue) => {
    const filteredMovies = initialMovies.filter((movie) => movie.nameRU.toLowerCase().includes(searchTerm.toLowerCase()))
    setMovies(filteredMovies)
    localStorage.setItem('searchValue', JSON.stringify(searchValue))
    localStorage.setItem('resultsSearch', JSON.stringify(filteredMovies))
    setIsLoading(false)
  }

  const handleShortMovies = () => {
    const filteredShortMovies = movies.filter((movie) => movie.duration <= 40);
    setShortMovies(filteredShortMovies)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    initScreen(screenWidth);
  }, [screenWidth]);

  useEffect(() => {
    setShownMovies(movies.slice(0, limitMovies));
  }, [movies, limitMovies]);

  const initScreen = (width) => {
    if (width > 1024) {
      setLimitMovies(16);
      setRowMovies(4)
    } else if (width < 1024 && width >= 768) {
      setLimitMovies(8);
      setRowMovies(2)
    } else if (width < 768) {
      setLimitMovies(5);
      setRowMovies(1)
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
    handleSearch(searchTerm)
  }

  function handleToogleCheck() {
    handleShortMovies()
    setChecked(!checked);
    localStorage.setItem('isShort', JSON.stringify(!checked))
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
      />
      {/* {isLoading && (
        <p className="movies__noresults">Ничего не найдено</p>
      )} */}
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          handleMoreMovies={handleMoreMovies}
          // handleSaveMovie={handleSaveMovie}
          // handleDeleteMovie={handleDeleteMovie}
          // movies={movies}
          allMovies={movies}
          movies={checked ? shortMovies : shownMovies}
          // searchResults={searchResults}
          // shortMovies={shortMovies}
          limitMovies={limitMovies}
        // checked={checked}
        // savedMovies={userMovies}
        />
      )}
    </main>
  );
}

export default Movies;