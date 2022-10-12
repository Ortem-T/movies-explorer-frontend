export const MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies';
export const API_URL = 'https://api.nomoreparties.co';

export let MAIN_URL = '';
const { NODE_ENV } = process.env;
if (NODE_ENV === 'production') {
  MAIN_URL = 'https://api.diplom.ortem.nomorepartiesxyz.ru';
} else {
  MAIN_URL = 'http://localhost:3001';
}

export const getTimeFromMins = (mins) => {
  let hours = Math.trunc(mins / 60);
  let minutes = mins % 60;
  return hours + 'ч ' + minutes + 'м';
};