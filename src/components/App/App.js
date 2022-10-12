import { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register'
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";

import * as moviesApi from '../../utils/MoviesApi';
import * as api from '../../utils/MainApi';

function App() {
  const location = useLocation();
  const pathWithHeader = ['/', '/movies', '/saved-movies', '/profile'];
  const pathWithFooter = ['/', '/movies', '/saved-movies'];

  // const [loggedIn, setLoggedIn] = useState(false);
  const [allMovies, setAllMovies] = useState([]);

  useEffect(() => {
    moviesApi
      .getMovies()
      .then((data) => {
        setAllMovies(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        // setIsInfoTooltipOpen(true);
        // if (err.includes(401)) {
        //   setMessage(AUTH_ERROR);
        //   setLoggedIn(false);
        //   localStorage.clear();
        // } else {
        //   setMessage(REQUEST_ERROR);
        // }
      });
  }, [setAllMovies]);

  function handleSaveMovie(movie) {
    api
      .addMovie(movie)
      .then((newMovie) => {
        // setUserMovies([newMovie, ...userMovies]);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        // if (err.includes(401)) {
        //   setIsInfoTooltipOpen(true);
        //   setMessage(AUTH_ERROR);
        //   setLoggedIn(false);
        //   localStorage.clear();
        // } else {
        //   handleError();
        // }
      });
  }

  return (
    <>
      {pathWithHeader.includes(location.pathname) ? (<Header />) : null}
      <Routes>
        <Route path="/"
          element={(
            <Main
            />
          )} />

        <Route path="/movies"
          element={(<Movies
            allMovies={allMovies}
          />)}
        />

        <Route path="/saved-movies"
          element={(<SavedMovies
          />)}
        />

        <Route path="/profile"
          element={(<Profile
          />)}
        />

        <Route path="/signin"
          element={(<Login />)}
        />

        <Route path="/signup"
          element={(<Register />)}
        />

        <Route path='*'
          element={(<PageNotFound />)}
        />

      </Routes>

      {pathWithFooter.includes(location.pathname) ? (<Footer />) : null}
    </>
  );
}

export default App;
