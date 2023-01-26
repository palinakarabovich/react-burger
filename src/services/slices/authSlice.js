import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    userChecked: false,
    userRequest: false,
    userSuccess: false,
    userError: false,
    loggedIn: false,
    authDataReceived: false
  },
  reducers: {
    getUserRequest: (state, action) => {
      return {
        userChecked: false,
        userRequest: true,
        userSuccess: false,
        userError: false,
        loggedIn: false,
        authDataReceived: state.authDataReceived
      }
    },
    getUserRequestSuccessful: (state, action) => {
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
    getUserRequestError: (state, action) => {
      return {
        userChecked: false,
        userRequest: false,
        userSuccess: false,
        userError: true,
        loggedIn: false,
        authDataReceived: true
      }
    },
    removeUser: (state, action) => {
      return {
        user: {},
        userChecked: false,
        userRequest: false,
        userSuccess: false,
        userError: false,
        loggedIn: false,
        authDataReceived: false,
      }
    },
    getUserUpdateRequest: (state, action) => {
      return {
        userChecked: false,
        userRequest: true,
        userSuccess: false,
        userError: false,
        loggedIn: true,
        authDataReceived: state.authDataReceived
      }
    },
    getUserUpdateRequestSuccessful: (state, action) => {
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
    getUserUpdateRequestError: (state, action) => {
      return {
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
