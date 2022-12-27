import { SERVER_URL } from './constans';
import { setCookie } from './cookie'
import checkResponse from './checkResponse';

const refreshToken = () => {
  return fetch(`${SERVER_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
  }).then(checkResponse);
}

const checkToken = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    console.log(err);
    if (err === 403 || err === 401) {
      const refreshData = await refreshToken();
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      setCookie('accessToken', refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
}

export default checkToken;
