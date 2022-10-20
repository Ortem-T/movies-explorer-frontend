import { useState, useEffect, } from 'react';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate
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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import InfoTooltip from '../InfoTooltip/InfoTooltip';
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
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (token) {
      api
        .checkToken(token)
        .then((userData) => {
          setCurrentUser(userData);
          setLoggedIn(true);
          setLoading(false)
        })
        .catch((err) => {
          setMessage(`Ошибка: ${err}`);
          setIsInfoTooltipOpen(true)
          setLoading(false)

        });
    } else {
      setLoggedIn(false);
      localStorage.clear();
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api.getUserData()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          setMessage(`Ошибка: ${err}`);
          setIsInfoTooltipOpen(true)
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      api
        .getSavedMovies()
        .then((movies) => {
          const myMovies = movies.data.filter((movie) => movie.owner === currentUser._id)
          setUserMovies(myMovies);
          setInitialUserMovies(myMovies)
        })
        .catch((err) => {
          setMessage(`Ошибка: ${err}`);
          setIsInfoTooltipOpen(true);
        });
    }
  }, [loggedIn, currentUser]);

  useEffect(() => {
    moviesApi
      .getMovies()
      .then((data) => {
        setMovies(data);
        setInitialMovies(data);
        setLoading(false)
      })
      .catch((err) => {
        setMessage(`Ошибка: ${err}`);
        setIsInfoTooltipOpen(true);
        setLoading(false)
      });
  }, []);

  function handleSaveMovie(movie) {
    api
      .addMovie(movie)
      .then((newMovie) => {
        setUserMovies([newMovie.data, ...userMovies]);
      })
      .catch((err) => {
        setMessage(`Ошибка: ${err}`);
        setIsInfoTooltipOpen(true);
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
        setMessage(`Ошибка: ${err}`);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleRegister(name, email, password) {
    api
      .register(name, email, password)
      .then(() => {
        handleLogin(email, password);
      })
      .catch((err) => {
        setMessage(`Ошибка регистрации. ${err}`);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleLogin(email, password) {
    api.authorize(email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true)
          setLoading(false)
          navigate('/movies');
        }
      })
      .catch((err) => {
        setMessage(`Невозможно войти. ${err}`);
        setIsInfoTooltipOpen(true);
        setLoading(false)
      })
  }

  function handleUpdateUser(name, email) {
    api
      .editUserData(name, email)
      .then((newData) => {
        setCurrentUser(newData);
        setMessage(`Данные успешно обновлены`);
        setIsInfoTooltipOpen(true);
      })
      .catch((err) => {
        setMessage(`Невозможно обновить данные. ${err}`);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.clear();
    navigate('/');
    setUserMovies([]);
    setMovies([]);
  }

  function onCloseTooltip() {
    setIsInfoTooltipOpen(false)
  }

  function handleResultsSearch() {
    setMessage(`Ничего не найдено`);
    setIsInfoTooltipOpen(true);
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
            element={(
              <ProtectedRoute loggedIn={loggedIn} loading={loading}>
                <Movies
                  movies={movies}
                  userMovies={userMovies}
                  initialMovies={initialMovies}
                  handleSaveMovie={handleSaveMovie}
                  handleDeleteMovie={handleDeleteMovie}
                  handleResultsSearch={handleResultsSearch}
                />
              </ProtectedRoute>
            )}
          />

          <Route path="/saved-movies"
            element={(
              <ProtectedRoute loggedIn={loggedIn} loading={loading}>
                <SavedMovies
                  userMovies={userMovies}
                  initialUserMovies={initialUserMovies}
                  handleDeleteMovie={handleDeleteMovie}
                  handleResultsSearch={handleResultsSearch}
                />
              </ProtectedRoute>
            )}
          />

          <Route path="/profile"
            element={(
              <ProtectedRoute loggedIn={loggedIn} loading={loading}>
                <Profile
                  handleUpdateUser={handleUpdateUser}
                  handleSignOut={handleSignOut}
                />
              </ProtectedRoute>
            )}
          />

          <Route path="/signin"
            element={loggedIn ? <Navigate to="/" /> : (<Login
              onLogin={handleLogin}
            />)}
          />

          <Route path="/signup"
            element={loggedIn ? <Navigate to="/" /> : (<Register
              onRegister={handleRegister}
            />)}
          />

          <Route path='*'
            element={(<PageNotFound />)}
          />

        </Routes>

        {pathWithFooter.includes(location.pathname) ? (<Footer />) : null}
        <InfoTooltip message={message} isOpen={isInfoTooltipOpen} onCloseTooltip={onCloseTooltip} />
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
