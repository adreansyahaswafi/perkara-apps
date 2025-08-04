import Axios from 'axios';
const ACCESS_TOKEN = import.meta.env.VITE_USER_TOKEN;
const REFRESH_TOKEN = import.meta.env.VITE_USER_REFRESH_TOKEN;
const LAST_ACTIVITY = 'LAST_ACTIVITY';
const IS_LOGIN = 'IS_LOGIN';
const getCurrentTime = () => Math.round(Date.now() / 1000);

export const callServiceLogout = () => {
  const { accessToken, refreshToken } = getToken();
  const { VITE_API_URL: baseURL } = import.meta.env;

  Axios.post(`${baseURL}/api/authentication/logout`, { accessToken, refreshToken })
    .finally(() => removeToken());
};

export const isTimeUp = () => {
  const { accessToken } = getToken();
  if (accessToken) {
    const lastActivity = localStorage.getItem(LAST_ACTIVITY);
    const shouldLogout = (getCurrentTime() - parseInt(lastActivity)) > parseInt(import.meta.env.VITE_IDLE_TIME);
    if (lastActivity && shouldLogout) return callServiceLogout();

    localStorage.setItem(LAST_ACTIVITY, getCurrentTime());
  }
  return false;
};

export const setToken = ({ accessToken = null, refreshToken = null, isLogin = undefined }) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken)
  localStorage.setItem(REFRESH_TOKEN, refreshToken)
  if (isLogin) localStorage.setItem(IS_LOGIN, true)
}

export const removeToken = () => {
  window.localStorage.clear()
  window.location.replace('/login')
}

export const getToken = () => ({
  accessToken: localStorage.getItem(ACCESS_TOKEN) ?? null,
  refreshToken: localStorage.getItem(REFRESH_TOKEN) ?? null,
});

export const isLoggedIn = () => !!localStorage.getItem(IS_LOGIN)

export const logout = () => {
  removeToken()
  // window.location.replace('/login')
}


