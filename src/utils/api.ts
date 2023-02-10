import { SERVER_URL } from "./constans";
import checkResponse from "./checkResponse";
import checkToken from "./checkToken";
import { getCookie } from "./cookie";
import { IUser, TIngredient } from "../types";

export const registerUser = async (user: IUser) => {
  const res = await fetch(`${SERVER_URL}/auth/register`,
    {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  return checkResponse(res);
}

export const getNewPasswordForUser = async (user: IUser) => {
  const res = await fetch(`${SERVER_URL}/password-reset`,
    {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  return checkResponse(res);
}


export const resetPasswordForUser = async (user: IUser) => {
  const res = await fetch(`${SERVER_URL}/password-reset/reset`,
    {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  return checkResponse(res);
}

export const loginUser = async (user: IUser) => {
  const res = await fetch(`${SERVER_URL}/auth/login`,
    {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  return checkResponse(res);
}

export const getUserInfo = async () => {
  const cookie = getCookie('accessToken');
  if (cookie !== undefined) {
    const res = await checkToken(`${SERVER_URL}/auth/user`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        authorization: cookie,
      },
    });
    return checkResponse(res);
  }
}

export const updateUserInfo = async (user: IUser) => {
  const cookie = getCookie('accessToken');
  if (cookie !== undefined) {
    const res = await checkToken(`${SERVER_URL}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: cookie,
      },
      body: JSON.stringify(user)
    })
    return checkResponse(res);
  }

}

export const logoutUser = async () => {
  const res = await fetch(`${SERVER_URL}/auth/logout`,
    {
      method: 'POST',
      body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  return checkResponse(res);
}

export const setOrderRequest = async (ingredients: Array<TIngredient>) => {
  const cookie = getCookie('accessToken');
  if (cookie !== undefined) {
    const res = await checkToken(`${SERVER_URL}/orders`, {
      method: 'POST',
      body: JSON.stringify({ ingredients }),
      headers: {
        'Content-Type': 'application/json',
        authorization: cookie,
      }
    })
    return checkResponse(res);
  }
}

export const getIngredientsRequest = async () => {
  const res = await fetch(`${SERVER_URL}/ingredients`)
  return checkResponse(res);
}