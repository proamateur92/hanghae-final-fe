import { Cookies } from 'react-cookie';

const cookie = new Cookies();

export const getCookie = key => {
  const token = cookie.get(key);

  if (token) {
    return token;
  }
};

export const setCookie = (key, value) => {
  cookie.set(key, value, { maxAge: 60 * 60 * 24 * 30 });
};

export const clearCookie = key => {
  cookie.remove(key);
};
