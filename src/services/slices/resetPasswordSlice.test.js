import reducer, {
  getNewPasswordRequest, getNewPasswordRequestSuccess, getNewPasswordRequestError,
  changePasswordRequest, changePasswordRequestSuccess, changePasswordRequestError, cleanResetPassword, initialState
} from './resetPasswordSlice'

describe('Testing ResetPasswordSlice', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(
      {
        requestResetPassword: false,
        requestResetPasswordSuccess: false,
        requestResetPasswordError: false,
        requestChangePassword: false,
        requestChangePasswordSuccess: false,
        requestChangePasswordError: false,
      }
    )
  })

  it('should request new password', () => {
    expect(reducer(initialState, getNewPasswordRequest())).toEqual(
      {
        requestResetPassword: true,
        requestResetPasswordSuccess: false,
        requestResetPasswordError: false,
        requestChangePassword: false,
        requestChangePasswordSuccess: false,
        requestChangePasswordError: false,
      }
    )
  })

  it('should request new password with success', () => {
    const previousState = {
      requestResetPassword: true,
      requestResetPasswordSuccess: false,
      requestResetPasswordError: false,
      requestChangePassword: false,
      requestChangePasswordSuccess: false,
      requestChangePasswordError: false,
    }
    expect(reducer(previousState, getNewPasswordRequestSuccess())).toEqual(
      {
        requestResetPassword: false,
        requestResetPasswordSuccess: true,
        requestResetPasswordError: false,
        requestChangePassword: false,
        requestChangePasswordSuccess: false,
        requestChangePasswordError: false,
      }
    )
  })

  it('should request new password with error', () => {
    const previousState = {
      requestResetPassword: true,
      requestResetPasswordSuccess: false,
      requestResetPasswordError: false,
      requestChangePassword: false,
      requestChangePasswordSuccess: false,
      requestChangePasswordError: false,
    }
    expect(reducer(previousState, getNewPasswordRequestError())).toEqual(
      {
        requestResetPassword: false,
        requestResetPasswordSuccess: false,
        requestResetPasswordError: true,
        requestChangePassword: false,
        requestChangePasswordSuccess: false,
        requestChangePasswordError: false,
      }
    )
  })

  it('should request to change password', () => {
    const previousState = {
      requestResetPassword: false,
      requestResetPasswordSuccess: true,
      requestResetPasswordError: false,
      requestChangePassword: false,
      requestChangePasswordSuccess: false,
      requestChangePasswordError: false,
    }
    expect(reducer(previousState, changePasswordRequest())).toEqual(
      {
        requestResetPasswordSuccess: true,
        requestChangePassword: true,
        requestChangePasswordSuccess: false,
        requestChangePasswordError: false,
        requestResetPasswordError: false,
        requestResetPassword: false,
      }
    )
  })

  it('should request to change password with success', () => {
    const previousState = {
      requestResetPasswordSuccess: true,
      requestChangePassword: true,
      requestChangePasswordSuccess: false,
      requestChangePasswordError: false,
      requestResetPasswordError: false,
      requestResetPassword: false,
    }
    expect(reducer(previousState, changePasswordRequestSuccess())).toEqual(
      {
        requestResetPasswordSuccess: true,
        requestChangePassword: false,
        requestChangePasswordSuccess: true,
        requestChangePasswordError: false,
        requestResetPasswordError: false,
        requestResetPassword: false,
      }
    )
  })

  it('should request to change password with error', () => {
    const previousState = {
      requestResetPasswordSuccess: true,
      requestChangePassword: true,
      requestChangePasswordSuccess: false,
      requestChangePasswordError: false,
      requestResetPasswordError: false,
      requestResetPassword: false,
    }
    expect(reducer(previousState, changePasswordRequestError())).toEqual(
      {
        requestResetPasswordSuccess: true,
        requestChangePassword: false,
        requestChangePasswordSuccess: false,
        requestChangePasswordError: true,
        requestResetPasswordError: false,
        requestResetPassword: false,
      }
    )
  })

  it('should clean itself', () => {
    const previousState = {
      requestResetPasswordSuccess: true,
      requestChangePassword: false,
      requestChangePasswordSuccess: false,
      requestChangePasswordError: true,
      requestResetPasswordError: false,
      requestResetPassword: false,
    }
    expect(reducer(previousState, cleanResetPassword())).toEqual(
      initialState
    )
  })

});