import { createSlice } from '@reduxjs/toolkit';

const resetPassword = createSlice({
  name: 'resetPassword',
  initialState: {
    requestResetPassword: false,
    requestResetPasswordSuccess: false,
    requestResetPasswordError: false,
    requestChangePassword: false,
    requestChangePasswordSuccess: false,
    requestChangePasswordError: false,
  },
  reducers: {
    getNewPasswordRequest: (state, action) => {
      return {
        requestResetPassword: true,
        requestResetPasswordSuccess: false,
        requestResetPasswordError: false
      }
    },
    getNewPasswordRequestSuccess: (state, action) => {
      return {
        requestResetPassword: false,
        requestResetPasswordSuccess: true,
        requestResetPasswordError: false
      }
    },
    getNewPasswordRequestError: (state, action) => {
      return {
        requestResetPassword: false,
        requestResetPasswordSuccess: false,
        requestResetPasswordError: true
      }
    },
    changePasswordRequest: (state, action) => {
      return {
        requestResetPasswordSuccess: true,
        requestChangePassword: true,
        requestChangePasswordSuccess: false,
        requestChangePasswordError: false,
      }
    },
    changePasswordRequestSuccess: (state, action) => {
      return {
        requestResetPasswordSuccess: true,
        requestChangePassword: false,
        requestChangePasswordSuccess: true,
        requestChangePasswordError: false,
      }
    },
    changePasswordRequestError: (state, action) => {
      return {
        requestResetPasswordSuccess: true,
        requestChangePassword: false,
        requestChangePasswordSuccess: false,
        requestChangePasswordError: true,
      }
    },
    cleanResetPassword: (state, action) => {
      return {
        requestResetPassword: false,
        requestResetPasswordSuccess: false,
        requestResetPasswordError: false,
        requestChangePassword: false,
        requestChangePasswordSuccess: false,
        requestChangePasswordError: false,
      }
    }
  }
});

export default resetPassword.reducer;
export const { getNewPasswordRequest, getNewPasswordRequestSuccess, getNewPasswordRequestError,
  changePasswordRequest, changePasswordRequestSuccess, changePasswordRequestError, cleanResetPassword } = resetPassword.actions;

