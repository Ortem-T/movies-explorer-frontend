import { useState, useEffect, } from 'react';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
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
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import * as moviesApi from '../../utils/MoviesApi';
import * as api from '../../utils/MainApi';

function App() {
  const location = useLocation();
  const pathWithHeader = ['/', '/movies', '/saved-movies', '/profile'];
  const pathWithFooter = ['/', '/movies', '/saved-movies'];

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [movies, setMovies] = useState([]);
  const [initialMovies, setInitialMovies] = useState([]);
  const [userMovies, setUserMovies] = useState([]);
  const [initialUserMovies, setInitialUserMovies] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (token) {
      api
        .checkToken(token)
        .then(({ name, email }) => {
          setCurrentUser({ name, email });
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, []);


  useEffect(() => {
    if (loggedIn) {
      api.getUserData()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (currentUser) {
      api
        .getSavedMovies()
        .then((movies) => {
          const myMovies = movies.data.filter((movie) => movie.owner === currentUser._id)
          setUserMovies(myMovies);
          setInitialUserMovies(myMovies)
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, [currentUser]);

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

  function handleSaveMovie(movie) {
    console.log(movie)
    api
      .addMovie(movie)
      .then((newMovie) => {
        console.log(newMovie)
        setUserMovies([newMovie.data, ...userMovies]);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleDeleteMovie(movie) {
    const movieId = movie._id;
    api
      .deleteSavedMovie(movieId)
      .then(() => {
        const newUserMovies = userMovies.filter((i) => i._id !== movieId && i);
        setUserMovies(newUserMovies);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleRegister(name, email, password) {
    api
      .register(name, email, password)
      .then(() => {
        // handleLogin({ email, password });
        navigate('/signin');
      })
      .catch((err) => {
        console.log(`Ошибка регистрации. ${err}`);
      });
  }

  function handleLogin(email, password) {
    api.authorize(email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true)
          navigate('/movies');
        }
      })
      .catch((err) => {
        console.log(`Невозможно войти. ${err}`);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        {pathWithHeader.includes(location.pathname) ?
          (<Header 
            loggedIn={loggedIn}
          />) :
          null}
        <Routes>
          <Route path="/"
            element={(
              <Main
              />
            )} />

          <Route path="/movies"
            element={(<Movies
              movies={movies}
              userMovies={userMovies}
              initialMovies={initialMovies}
              handleSaveMovie={handleSaveMovie}
              handleDeleteMovie={handleDeleteMovie}
            />)}
          />

          <Route path="/saved-movies"
            element={(<SavedMovies
              userMovies={userMovies}
              initialUserMovies={initialUserMovies}
              handleDeleteMovie={handleDeleteMovie}
            />)}
          />

          <Route path="/profile"
            element={(<Profile
            />)}
          />

          <Route path="/signin"
            element={(<Login
              onLogin={handleLogin}
            />)}
          />

          <Route path="/signup"
            element={(<Register
              onRegister={handleRegister}
            />)}
          />

          <Route path='*'
            element={(<PageNotFound />)}
          />

        </Routes>

        {pathWithFooter.includes(location.pathname) ? (<Footer />) : null}
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
