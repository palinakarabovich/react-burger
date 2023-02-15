import { userData, userDataForLogin, userUpdatedData } from "../../assets/userData";
import { getNewPassword, getUser, login, logout, register, resetPassword, updateUser } from "./authActions";

global.fetch = jest.fn();

const mockFetch = fetch;

describe('should work with authorization', () => {

  const dispatch = jest.fn();

  it('should register with success', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        data: userData,
      })
    })
    const thunk = register(userData);
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(dispatch).toBeCalledTimes(2);
    expect(calls[0]).toEqual([ { type: 'user/getUserRequest', payload: undefined } ]);
    expect(calls[1]).toEqual([ { type: 'user/getUserRequestSuccessful', payload: userData } ]);
  })

  it('should register with error', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
    })
    const thunk = register(userData);
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(dispatch).toBeCalledTimes(2);
    expect(calls[0]).toEqual([ { type: 'user/getUserRequest', payload: undefined } ]);
    expect(calls[1]).toEqual([ { type: 'user/getUserRequestError', payload: undefined } ]);
  })

  it('should get new password with success', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        data: userData,
      })
    })
    const thunk = getNewPassword(userData);
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(dispatch).toBeCalledTimes(2);
    expect(calls[0]).toEqual([ { type: 'resetPassword/getNewPasswordRequest', payload: undefined } ]);
    expect(calls[1]).toEqual([ { type: 'resetPassword/getNewPasswordRequestSuccess', payload: undefined } ]);
  })

  it('should get new password with error', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
    })
    const thunk = getNewPassword(userData);
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(dispatch).toBeCalledTimes(2);
    expect(calls[0]).toEqual([ { type: 'resetPassword/getNewPasswordRequest', payload: undefined } ]);
    expect(calls[1]).toEqual([ { type: 'resetPassword/getNewPasswordRequestError', payload: undefined } ]);
  })

  it('should reset new password with success', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        data: userData,
      })
    })
    const thunk = resetPassword(userData);
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(dispatch).toBeCalledTimes(2);
    expect(calls[0]).toEqual([ { type: 'resetPassword/changePasswordRequest', payload: undefined } ]);
    expect(calls[1]).toEqual([ { type: 'resetPassword/changePasswordRequestSuccess', payload: undefined } ]);
  })

  it('should reset new password with error', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
    })
    const thunk = resetPassword(userData);
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(dispatch).toBeCalledTimes(2);
    expect(calls[0]).toEqual([ { type: 'resetPassword/changePasswordRequest', payload: undefined } ]);
    expect(calls[1]).toEqual([ { type: 'resetPassword/changePasswordRequestError', payload: undefined } ]);
  })

  it('should login with success', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        success: true,
        accessToken: '111',
        refreshToken: '111',
        user: userData
      })
    })
    const thunk = login(userDataForLogin);
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(dispatch).toBeCalledTimes(2);
    expect(calls[0]).toEqual([ { type: 'user/getUserRequest', payload: undefined } ]);
    expect(calls[1]).toEqual([ { type: 'user/getUserRequestSuccessful', payload: userData } ]);
  })

  it('should login with error', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
    })
    const thunk = login(userDataForLogin);
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(dispatch).toBeCalledTimes(2);
    expect(calls[0]).toEqual([ { type: 'user/getUserRequest', payload: undefined } ]);
    expect(calls[1]).toEqual([ { type: 'user/getUserRequestError', payload: undefined } ]);
  })

  it('should get user with success', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        success: true,
        user: userData
      })
    })
    const thunk = getUser();
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(dispatch).toBeCalledTimes(2);
    expect(calls[0]).toEqual([ { type: 'user/getUserRequest', payload: undefined } ]);
    expect(calls[1]).toEqual([ { type: 'user/getUserRequestSuccessful', payload: userData } ]);
  })

  it('should get user with error', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
    })
    const thunk = getUser();
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(dispatch).toBeCalledTimes(2);
    expect(calls[0]).toEqual([ { type: 'user/getUserRequest', payload: undefined } ]);
    expect(calls[1]).toEqual([ { type: 'user/getUserRequestError', payload: undefined } ]);
  })

  it('should update user with success', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        success: true,
        user: userUpdatedData
      })
    })
    const thunk = updateUser(userData);
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(dispatch).toBeCalledTimes(2);
    expect(calls[0]).toEqual([ { type: 'user/getUserUpdateRequest', payload: undefined } ]);
    expect(calls[1]).toEqual([ { type: 'user/getUserUpdateRequestSuccessful', payload: userUpdatedData } ]);
  })

  it('should update user with error', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
    })
    const thunk = updateUser(userData);
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(dispatch).toBeCalledTimes(2);
    expect(calls[0]).toEqual([ { type: 'user/getUserUpdateRequest', payload: undefined } ]);
    expect(calls[1]).toEqual([ { type: 'user/getUserUpdateRequestError', payload: undefined } ]);
  })

  it('should logout user with success', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        success: true,
      })
    })
    const thunk = logout();
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(dispatch).toBeCalledTimes(2);
    expect(calls[0]).toEqual([ { type: 'user/getUserRequest', payload: undefined } ]);
    expect(calls[1]).toEqual([ { type: 'user/removeUser', payload: undefined } ]);
  })

  it('should logout user with error', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
    })
    const thunk = logout();
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(dispatch).toBeCalledTimes(2);
    expect(calls[0]).toEqual([ { type: 'user/getUserRequest', payload: undefined } ]);
    expect(calls[1]).toEqual([ { type: 'user/getUserRequestError', payload: undefined } ]);
  })

})