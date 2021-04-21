import axios from 'axios';
import { createBrowserHistory } from 'history';
const UNAUTHENTICATED = 401;
const UNAUTHORIZED = 403;

type options = {
  headers: {
    'Content-Type': string;
    Authorization?: string;
  };
};
export const defaultReqOptions: options = {
  headers: {
    'Content-Type': 'application/json',
  },
};

axios.interceptors.response.use(
  response => response,
  error => {
    const { response: { status = -1, data: { statusCode = -1 } = {} } = {} } = error;
    const history = createBrowserHistory();
    // console.log(status, statusCode, error.response, window.location.pathname, error.response)

    const usernameUpdateAttempted = /\/api\/.+\/username/i.test(error?.response?.request?.responseURL || '');
    let logoutFlag = false;

    // If connection refused
    if (statusCode === -1 && status === -1) {
      history.push('/error?status=404');
      logoutFlag = true;
    }
    // the user's JWT may have expired
    else if (status === UNAUTHENTICATED && !usernameUpdateAttempted) {
      history.push('/login');
      logoutFlag = true;
    } else if (status === UNAUTHORIZED && !['/', '/login', '/register'].includes(window.location.pathname)) {
      history.push('/error?status=403');
      window.location.reload();
    }

    // the history.push doesn't take effect until
    // window.location.reload()
    if (logoutFlag) {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('username');
      window.localStorage.removeItem('role');
      window.location.reload();
    }

    return Promise.reject(error);
  }
);

export const POST = async (
  url = '',
  body = {},
  options = defaultReqOptions
) => {
  try {
    return await axios.post(url, body, options);
  } catch (err) {
    throw err;
  }
};

export const PUT = async (url = '', body = {}, options = defaultReqOptions) => {
  try {
    return await axios.put(url, body, options);
  } catch (err) {
    throw err;
  }
};

export const GET = async (url = '', options = defaultReqOptions) => {
  try {
    return await axios.get(url, options);
  } catch (err) {
    throw err;
  }
};

export const DELETE = async (url = '', options = defaultReqOptions) => {
  try {
    return await axios.delete(url, options);
  } catch (err) {
    throw err;
  }
};
