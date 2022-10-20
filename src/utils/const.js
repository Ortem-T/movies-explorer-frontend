export const MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies';
export const API_URL = 'https://api.nomoreparties.co';

export let MAIN_URL = 'https://api.diplom.ortem.nomorepartiesxyz.ru';
// const { NODE_ENV } = process.env;
// if (NODE_ENV === 'production') {
//   MAIN_URL = 'https://api.diplom.ortem.nomorepartiesxyz.ru';
// } else {
//   MAIN_URL = 'http://localhost:3001';
// }

export const getTimeFromMins = (mins) => {
  let hours = Math.trunc(mins / 60);
  let minutes = mins % 60;
  return hours + 'ч ' + minutes + 'м';
};

export const SHORT_MOVIE_DURATION = 40;
export const FULL_SCREEN = 1024;
export const MEDIUM_SCREEN = 768;

export const SIXTEEN_MOVIES = 16;
export const EIGHT_MOVIES = 8;
export const FIVE_MOVIES = 5;
export const FOUR_MOVIES = 4;
export const TWO_MOVIES = 2;
export const ONE_MOVIE = 1;