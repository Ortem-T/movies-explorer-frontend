import { MAIN_URL, API_URL } from '../utils/const';

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}

const getHeaders = () => {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
  };
};

export const register = (name, email, password) => {
  return fetch(`${MAIN_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({name, email, password}),
  }).then(handleResponse);
};

export const authorize = (email, password) => {
  return fetch(`${MAIN_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })
    .then(handleResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      }
    })
};

export const checkToken = (token) => {
  return fetch(`${MAIN_URL}/users/me`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(handleResponse);
};

export const getUserData = () => {
  return fetch(`${MAIN_URL}/users/me`, {
    headers: getHeaders(),
  }).then(handleResponse);
};

export const addMovie = (data) => {
  return fetch(`${MAIN_URL}/movies`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      country: data.country,
      director: data.director,
      duration: data.duration,
      year: data.year,
      description: data.description,
      image: `${API_URL}${data.image.url}`,
      trailerLink: data.trailerLink,
      thumbnail: `${API_URL}${data.image.formats.thumbnail.url}`,
      nameRU: data.nameRU,
      nameEN: data.nameEN,
      movieId: data.id,
    }),
  }).then(handleResponse);
};

export const getSavedMovies = () => {
  return fetch(`${MAIN_URL}/movies`, {
    headers: getHeaders(),
  }).then(handleResponse);
};

export const deleteSavedMovie = (movieId) => {
  return fetch(`${MAIN_URL}/movies/${movieId}`, {
    method: 'DELETE',
    headers: getHeaders(),
  }).then(handleResponse);
};