import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types';

export type TAuthSlice = {
  user: IUser | undefined;
  userChecked: boolean;
  userRequest: boolean;
  userSuccess: boolean;
  userError: boolean;
  loggedIn: boolean;
  authDataReceived: boolean;
}

const initialState: TAuthSlice = {
  user: undefined,
  userChecked: false,
  userRequest: false,
  userSuccess: false,
  userError: false,
  loggedIn: false,
  authDataReceived: false
}

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserRequest: (state) => {
      return {
        user: undefined,
        userChecked: false,
        userRequest: true,
        userSuccess: false,
        userError: false,
        loggedIn: false,
        authDataReceived: state.authDataReceived
      }
    },
    getUserRequestSuccessful: (state, action: PayloadAction<IUser>) => {
      return {
        userChecked: true,
        user: action.payload,
        userRequest: false,
        userSuccess: true,
        userError: false,
        loggedIn: true,
        authDataReceived: true
      }
    },
    getUserRequestError: () => {
      return {
        user: undefined,
        userChecked: false,
        userRequest: false,
        userSuccess: false,
        userError: true,
        loggedIn: false,
        authDataReceived: true
      }
    },
    removeUser: () => {
      return {
        user: undefined,
        userChecked: false,
        userRequest: false,
        userSuccess: false,
        userError: false,
        loggedIn: false,
        authDataReceived: false,
      }
    },
    getUserUpdateRequest: (state) => {
      return {
        user: state.user,
        userChecked: false,
        userRequest: true,
        userSuccess: false,
        userError: false,
        loggedIn: true,
        authDataReceived: state.authDataReceived
      }
    },
    getUserUpdateRequestSuccessful: (state, action: PayloadAction<IUser>) => {
      return {
        userChecked: false,
        user: action.payload,
        userRequest: false,
        userSuccess: true,
        userError: false,
        loggedIn: true,
        authDataReceived: state.authDataReceived
      }
    },
    getUserUpdateRequestError: (state) => {
      return {
        user: state.user,
        userChecked: false,
        userRequest: false,
        userSuccess: false,
        userError: true,
        loggedIn: true,
        authDataReceived: state.authDataReceived
      }
    },
  }
});

export default authSlice.reducer;
export const { getUserRequest, getUserRequestSuccessful, getUserRequestError, removeUser, getUserUpdateRequest,
  getUserUpdateRequestSuccessful, getUserUpdateRequestError } = authSlice.actions;
