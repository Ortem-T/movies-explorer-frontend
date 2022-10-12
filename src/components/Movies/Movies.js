import { useState, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../../components/Preloader/Preloader';

function Movies({ allMovies }) {
  const [submitted, setSubmitted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [checked, setChecked] = useState(false);
  const [shortMovies, setShortMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [limitMovies, setLimitMovies] = useState(null);
  const [shownMovies, setShownMovies] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.screen.width);

  useEffect(() => {
    if (submitted) {

      const results = allMovies.filter(movie =>
        movie.nameRU.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
      setIsLoading(true);
      initScreen(screenWidth);
      localStorage.removeItem('searchValue')
      localStorage.removeItem('resultsSearch')
      localStorage.setItem('searchValue', JSON.stringify(searchTerm))
      localStorage.setItem('resultsSearch', JSON.stringify(results))
    }
    setTimeout(() => setIsLoading(false), 1000);
  }, [submitted, searchTerm, allMovies, checked, screenWidth]);

  useEffect(() => {
    setSearchResults(JSON.parse(localStorage.getItem('resultsSearch')));
    setChecked(JSON.parse(localStorage.getItem('isShort')));
  }, [])

  useEffect(() => {
    if (checked) {
      const shortMovies = searchResults.filter(movie =>
        movie.duration <= 40
      );
      setShortMovies(shortMovies.slice(0, limitMovies));
      localStorage.setItem('isShort', JSON.stringify(checked))
    }
  }, [checked, searchResults, setShortMovies, screenWidth, limitMovies]);

  useEffect(() => {
    setShownMovies(searchResults.slice(0, limitMovies));
  }, [limitMovies, searchResults, screenWidth]);

  useEffect(() => {
    initScreen(screenWidth);
  }, [screenWidth]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const initScreen = (width) => {
    if (width > 1024) {
      setLimitMovies(16);
    } else if (width < 1024 && width >= 768) {
      setLimitMovies(8);
    } else if (width < 768) {
      setLimitMovies(5);
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
    setSubmitted(true);
  }

  function handleToogleCheck() {
    setChecked(!checked);
    localStorage.setItem('isShort', JSON.stringify(!checked))
  }

  function handleMoreMovies() {
    setLimitMovies(limitMovies + 4);
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
          movies={checked ? shortMovies : shownMovies}
          searchResults={searchResults}
          shortMovies={shortMovies}
          limitMovies={limitMovies}
          checked={checked}
        />
      )}
    </main>
  );
}

export default Movies;