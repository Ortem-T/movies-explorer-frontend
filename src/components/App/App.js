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

// import * as moviesApi from '../../utils/MoviesApi';
import * as api from '../../utils/MainApi';

function App() {
  const location = useLocation();
  const pathWithHeader = ['/', '/movies', '/saved-movies', '/profile'];
  const pathWithFooter = ['/', '/movies', '/saved-movies'];

  // const [loggedIn, setLoggedIn] = useState(false);
  // const [allMovies, setAllMovies] = useState([]);

  const navigate = useNavigate();

  // useEffect(() => {
  //     api
  //       .getSavedMovies()
  //       .then((data) => {
  //         setUserMovies(data);
  //       })
  //       .catch((err) => {
  //         console.log(`Ошибка: ${err}`);
  //         if (err.includes(401)) {
  //           setIsInfoTooltipOpen(true);
  //           setMessage(AUTH_ERROR);
  //           setLoggedIn(false);
  //           localStorage.clear();
  //         } else {
  //           handleError();
  //         }
  //       });
  //   }
  // , [setUserMovies]);

  // function handleSaveMovie(movie) {
  //   console.log(movie)
  //   api
  //     .addMovie(movie)
  //     .then((newMovie) => {
  //       console.log(newMovie)
  //       setUserMovies([newMovie.data, ...userMovies.data]);
  //     })
  //     .catch((err) => {
  //       console.log(`Ошибка: ${err}`);
  //       if (err.includes(401)) {
  //         setIsInfoTooltipOpen(true);
  //         setMessage(AUTH_ERROR);
  //         setLoggedIn(false);
  //         localStorage.clear();
  //       } else {
  //         handleError();
  //       }
  //     });
  // }

  // function handleDeleteMovie(movie) {
  //   const movieId = movie._id;
  //   api
  //     .deleteSavedMovie(movieId)
  //     .then(() => {
  //       const newUserMovies = userMovies.data.filter((i) => i._id !== movieId && i);
  //       setUserMovies(newUserMovies);
  //     })
  //     .catch((err) => {
  //       console.log(`Ошибка: ${err}`);
  //       if (err.includes(401)) {
  //         setIsInfoTooltipOpen(true);
  //         setMessage(AUTH_ERROR);
  //         setLoggedIn(false);
  //         localStorage.clear();
  //       } else {
  //         handleError();
  //       }
  //     });
  // }

  function handleRegister(name, email, password) {
    api
      .register(name, email, password)
      .then(() => {
        // handleLogin({ email, password });
        navigate('/signin');
      })
      .catch((err) => {
        console.log(`Ошибка регистрации. ${err}`);
        // setIsInfoTooltipOpen(true);
        // if (err.includes(409)) {
        //   setMessage(CONFLICT_ERR_MESSAGE);
        // } else if (err.includes(400)) {
        //   setMessage(BAD_REQ_ERR_MESSAGE);
        // } else {
        //   setMessage(SERVER_ERROR);
        // }
      });
  }

  function handleLogin(email, password) {
    api.authorize(email, password)
      .then((res) => {
        if (res) {
          // setLoggedIn(true)
          // setUserEmail(email)
          navigate('/movies');
        }
      })
      .catch((err) => {
        // setMessage(false);
        // setIsInfoTooltipOpen(true);
        console.log(`Невозможно войти. ${err}`);
      })
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
            // allMovies={allMovies}
            // handleSaveMovie={handleSaveMovie}
            // handleDeleteMovie={handleDeleteMovie}
          />)}
        />

        <Route path="/saved-movies"
          element={(<SavedMovies
            // userMovies={userMovies}
            // handleDeleteMovie={handleDeleteMovie}
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
  );
}

export default App;
