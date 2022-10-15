import { useState, useEffect } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../../components/Preloader/Preloader';

function SavedMovies({ userMovies, handleDeleteMovie }) {
  const [submitted, setSubmitted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [checked, setChecked] = useState(false);
  const [shortMovies, setShortMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSearchResults(userMovies);
    setIsLoading(false)
  }, [userMovies]);

  useEffect(() => {
    if (submitted) {

      const results = userMovies.filter(movie =>
        movie.nameRU.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
      // setIsLoading(true);
    }
    // setTimeout(() => setIsLoading(false), 1000);
  }, [submitted, searchTerm, userMovies]);

  useEffect(() => {
    if (checked) {
      const shortMovies = searchResults.filter(movie =>
        movie.duration <= 40
      );
      setShortMovies(shortMovies);
    }
  }, [checked, searchResults, setShortMovies,]);


  const handleChange = e => {
    setSearchTerm(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  function handleToogleCheck() {
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
          movies={checked ? shortMovies : searchResults}
          savedMovies={userMovies}
          handleDeleteMovie={handleDeleteMovie}
        />
      )}
    </main>
  );
}

export default SavedMovies;