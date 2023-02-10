import { SERVER_URL } from "../../utils/constans";
import { getUserRequest, getUserRequestSuccessful, getUserRequestError, removeUser, getUserUpdateRequestError, getUserUpdateRequestSuccessful, getUserUpdateRequest } from "../slices/authSlice";
import checkResponse from "../../utils/checkResponse";
import { setCookie } from "../../utils/cookie";
import checkToken from "../../utils/checkToken";
import { getCookie } from "../../utils/cookie";
import { changePasswordRequest, changePasswordRequestError, changePasswordRequestSuccess, getNewPasswordRequest, getNewPasswordRequestError, getNewPasswordRequestSuccess } from "../slices/resetPasswordSlice";
import { TypedThunk } from "..";
import { IUser } from "../../types";

export const register = (user: IUser) : TypedThunk => dispatch => {
  dispatch(getUserRequest());
  fetch(`${SERVER_URL}/auth/register`,
    {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => checkResponse(res))
    .then((data) => {
      dispatch(getUserRequestSuccessful(user));
      localStorage.setItem('refreshToken', data.refreshToken);
      setCookie('accessToken', data.accessToken);
    })
    .catch(() => dispatch(getUserRequestError()));
}

export const getNewPassword = (user: IUser) : TypedThunk => dispatch => {
  dispatch(getNewPasswordRequest());
  fetch(`${SERVER_URL}/password-reset`,
    {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => checkResponse(res))
    .then(() => {
      dispatch(getNewPasswordRequestSuccess());
    })
    .catch(() => dispatch(getNewPasswordRequestError()));
}

export const resetPassword = (user: IUser) : TypedThunk => dispatch => {
  dispatch(changePasswordRequest());
  fetch(`${SERVER_URL}/password-reset/reset`,
    {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => checkResponse(res))
    .then(() => {
      dispatch(changePasswordRequestSuccess());
    })
    .catch(() => dispatch(changePasswordRequestError()));
}

export const login = (user: IUser) : TypedThunk => dispatch => {
  dispatch(getUserRequest());
  fetch(`${SERVER_URL}/auth/login`,
    {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
    .then(res => checkResponse(res))
    .then((data) => {
      dispatch(getUserRequestSuccessful({ name: data.user.name, email: user.email, password: user.password }));
      localStorage.setItem('refreshToken', data.refreshToken);
      setCookie('accessToken', data.accessToken);
    })
    .catch(() => dispatch(getUserRequestError()));
}

export const getUser = () : TypedThunk => dispatch => {
  dispatch(getUserRequest());
  const cookie = getCookie('accessToken');
  if(cookie !== undefined){
    checkToken(`${SERVER_URL}/auth/user`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        authorization: cookie,
      },
    })
      .then((data) => {
        dispatch(getUserRequestSuccessful(data.user));
      })
      .catch(() => dispatch(getUserRequestError()));
  }
}

export const updateUser = (user: IUser) : TypedThunk => dispatch => {
  dispatch(getUserUpdateRequest());
  const cookie = getCookie('accessToken');
  if(cookie !== undefined) {
    checkToken(`${SERVER_URL}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: cookie,
      },
      body: JSON.stringify(user)
    })
      .then((data) => {
        dispatch(getUserUpdateRequestSuccessful(data.user));
      })
      .catch(() => dispatch(getUserUpdateRequestError()));
  }
}

export const logout = () : TypedThunk => dispatch => {
  dispatch(getUserRequest());
  fetch(`${SERVER_URL}/auth/logout`,
    {
      method: 'POST',
      body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => checkResponse(res))
    .then((data) => {
      setCookie('accessToken', '');
      localStorage.clear();
      dispatch(removeUser());
    })
    .catch(() => dispatch(getUserRequestError()));
}