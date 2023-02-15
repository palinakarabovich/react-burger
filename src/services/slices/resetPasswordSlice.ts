import { createSlice } from '@reduxjs/toolkit';

type TResetPassword = {
  requestResetPassword: boolean;
  requestResetPasswordSuccess: boolean;
  requestResetPasswordError: boolean;
  requestChangePassword: boolean;
  requestChangePasswordSuccess: boolean;
  requestChangePasswordError: boolean;
}

export const initialState: TResetPassword = {
  requestResetPassword: false,
  requestResetPasswordSuccess: false,
  requestResetPasswordError: false,
  requestChangePassword: false,
  requestChangePasswordSuccess: false,
  requestChangePasswordError: false,
}

const resetPassword = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {
    getNewPasswordRequest: () => {
      return {
        requestResetPassword: true,
        requestResetPasswordSuccess: false,
        requestResetPasswordError: false,
        requestChangePassword: false,
        requestChangePasswordSuccess: false,
        requestChangePasswordError: false,
      }
    },
    getNewPasswordRequestSuccess: () => {
      return {
        requestResetPassword: false,
        requestResetPasswordSuccess: true,
        requestResetPasswordError: false,
        requestChangePassword: false,
        requestChangePasswordSuccess: false,
        requestChangePasswordError: false,
      }
    },
    getNewPasswordRequestError: () => {
      return {
        requestResetPassword: false,
        requestResetPasswordSuccess: false,
        requestResetPasswordError: true,
        requestChangePassword: false,
        requestChangePasswordSuccess: false,
        requestChangePasswordError: false,
      }
    },
    changePasswordRequest: () => {
      return {
        requestResetPasswordSuccess: true,
        requestChangePassword: true,
        requestChangePasswordSuccess: false,
        requestChangePasswordError: false,
        requestResetPasswordError: false,
        requestResetPassword: false,
      }
    },
    changePasswordRequestSuccess: () => {
      return {
        requestResetPasswordSuccess: true,
        requestChangePassword: false,
        requestChangePasswordSuccess: true,
        requestChangePasswordError: false,
        requestResetPasswordError: false,
        requestResetPassword: false,
      }
    },
    changePasswordRequestError: () => {
      return {
        requestResetPasswordSuccess: true,
        requestChangePassword: false,
        requestChangePasswordSuccess: false,
        requestChangePasswordError: true,
        requestResetPasswordError: false,
        requestResetPassword: false,
      }
    },
    cleanResetPassword: () => {
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

