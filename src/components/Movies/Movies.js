import { useState, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../../components/Preloader/Preloader';

function Movies({ movies, userMovies, initialMovies, handleSaveMovie, handleDeleteMovie }) {
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
    setShownMovies(movies)
  }, [movies]);

  const handleSearch = (searchValue) => {
    const filteredMovies = initialMovies.filter((movie) => movie.nameRU.toLowerCase().includes(searchTerm.toLowerCase()))
    setShownMovies(filteredMovies)
    localStorage.setItem('searchValue', JSON.stringify(searchValue))
    localStorage.setItem('resultsSearch', JSON.stringify(filteredMovies))
    setIsLoading(false)
  }

  const handleShortMovies = () => {
    const filteredShortMovies = shownMovies.filter((movie) => movie.duration <= 40);
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
    setShownMoreMovies(shownMovies.slice(0, limitMovies));
  }, [shownMovies, limitMovies]);

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
          handleSaveMovie={handleSaveMovie}
          handleDeleteMovie={handleDeleteMovie}
          // movies={movies}
          allMovies={movies}
          movies={checked ? shortMovies : shownMoreMovies}
          userMovies={userMovies}
          // searchResults={searchResults}
          // shortMovies={shortMovies}
          limitMovies={limitMovies}
        // checked={checked}
        />
      )}
    </main>
  );
}

export default Movies;