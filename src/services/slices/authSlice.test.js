import { userData, userUpdatedData } from '../../assets/userData';
import reducer, {
  getUserRequest, getUserRequestSuccessful, getUserRequestError, removeUser, getUserUpdateRequest,
  getUserUpdateRequestSuccessful, getUserUpdateRequestError, initialState
} from './authSlice'

describe('Testing AuthSlice', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(
      initialState
    )
  })

  it('should request certain user', () => {
    expect(reducer(initialState, getUserRequest())).toEqual(
      {
        user: undefined,
        userChecked: false,
        userRequest: true,
        userSuccess: false,
        userError: false,
        loggedIn: false,
        authDataReceived: false,
      }
    )
  })

  it('should request certain user with success', () => {
    const previousState = {
      user: undefined,
      userChecked: false,
      userRequest: true,
      userSuccess: false,
      userError: false,
      loggedIn: false,
      authDataReceived: false,
    }
    expect(reducer(previousState, getUserRequestSuccessful(userData))).toEqual(
      {
        userChecked: true,
        user: userData,
        userRequest: false,
        userSuccess: true,
        userError: false,
        loggedIn: true,
        authDataReceived: true
      }
    )
  })

  it('should request certain user with error', () => {
    const previousState = {
      user: undefined,
      userChecked: false,
      userRequest: true,
      userSuccess: false,
      userError: false,
      loggedIn: false,
      authDataReceived: false,
    }
    expect(reducer(previousState, getUserRequestError())).toEqual(
      {
        user: undefined,
        userChecked: false,
        userRequest: false,
        userSuccess: false,
        userError: true,
        loggedIn: false,
        authDataReceived: true
      }
    )
  })

  it('should remove user', () => {
    const previousState = {
      userChecked: true,
      user: userData,
      userRequest: false,
      userSuccess: true,
      userError: false,
      loggedIn: true,
      authDataReceived: true
    }
    expect(reducer(previousState, removeUser())).toEqual(
      initialState
    )
  })

  it('should request to update information about user', () => {
    const previousState = {
      userChecked: true,
      user: userData,
      userRequest: false,
      userSuccess: true,
      userError: false,
      loggedIn: true,
      authDataReceived: true
    }
    expect(reducer(previousState, getUserUpdateRequest())).toEqual({
      user: userData,
      userChecked: false,
      userRequest: true,
      userSuccess: false,
      userError: false,
      loggedIn: true,
      authDataReceived: true,
    }
    )
  })

  it('should request to update information about user with success', () => {
    const previousState = {
      user: userData,
      userChecked: false,
      userRequest: true,
      userSuccess: false,
      userError: false,
      loggedIn: true,
      authDataReceived: true,
    }
    expect(reducer(previousState, getUserUpdateRequestSuccessful(userUpdatedData))).toEqual({
      userChecked: false,
      user: userUpdatedData,
      userRequest: false,
      userSuccess: true,
      userError: false,
      loggedIn: true,
      authDataReceived: true
    }
    )
  })

  it('should request to update information about user with error', () => {
    const previousState = {
      user: userData,
      userChecked: false,
      userRequest: true,
      userSuccess: false,
      userError: false,
      loggedIn: true,
      authDataReceived: true,
    }
    expect(reducer(previousState, getUserUpdateRequestError())).toEqual({
      user: userData,
      userChecked: false,
      userRequest: false,
      userSuccess: false,
      userError: true,
      loggedIn: true,
      authDataReceived: true,
    }
    )
  })
  
});