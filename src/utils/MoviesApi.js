import { MOVIES_URL } from '../utils/const';

export const getMovies = () => {
  return fetch(MOVIES_URL).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  });
};
