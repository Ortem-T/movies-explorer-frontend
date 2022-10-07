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

function App() {
  const location = useLocation();
  const pathWithHeader = ['/', '/movies', '/saved-movies', '/profile'];
  const pathWithFooter = ['/', '/movies', '/saved-movies'];
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
