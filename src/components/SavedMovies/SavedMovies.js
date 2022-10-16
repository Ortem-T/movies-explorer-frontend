import { useState, useEffect, } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../../components/Preloader/Preloader';

function SavedMovies({ userMovies, initialUserMovies, handleDeleteMovie }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [shortMovies, setShortMovies] = useState([]);
  const [shownMovies, setShownMovies] = useState([]);
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setShownMovies(userMovies)
  }, [userMovies]);

  const handleSearch = () => {
    const filteredMovies = initialUserMovies.filter((movie) => movie.nameRU.toLowerCase().includes(searchTerm.toLowerCase()))
    setShownMovies(filteredMovies)
    setIsLoading(false)
  }

  const handleShortMovies = () => {
    const filteredShortMovies = shownMovies.filter((movie) => movie.duration <= 40);
    console.log(filteredShortMovies)
    setShortMovies(filteredShortMovies)
  }

  const handleChange = e => {
    setSearchTerm(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true)
    handleSearch(searchTerm)
  }

  function handleToogleCheck() {
    handleShortMovies()
    setChecked(!checked);
  }

  return (
    <main className='saved-movies'>
      <SearchForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        checked={checked}
        handleToogleCheck={handleToogleCheck}
      />
      {isLoading ? (
        <Preloader />) : (
        <MoviesCardList
          movies={userMovies}
          savedMovies={checked ? shortMovies : shownMovies}
          handleDeleteMovie={handleDeleteMovie}
        />
      )}
    </main>
  );
}

export default SavedMovies;