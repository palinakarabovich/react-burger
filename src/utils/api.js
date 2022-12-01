import {SERVER_URL} from './constans';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`${res.status}`);
}

export const getAllIngredients = () => {
  return fetch(SERVER_URL)
  .then((res) => checkResponse(res));
}

