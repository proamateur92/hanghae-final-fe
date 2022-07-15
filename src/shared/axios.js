import axios from 'axios';
import { getCookie, setCookie } from './cookie';

const instance = axios.create({
  baseURL: 'http://43.200.52.184:8080',
});

export const setAccessToken = () => {
  let accessToken = getCookie('accessToken');

  if (accessToken) {
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
  }
};

// response interceptor
instance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const {
      config,
      response: { status },
    } = error;
    if (status === 401) {
      console.log('권한 인증 에러');
      console.log(error);
      if (error.response.data.msg === 'TokenExpiredError') {
        console.log('토큰 만료 에러');
        const originalRequest = config;
        const refreshToken = getCookie('refreshToken');
        // token refresh 요청
        const { data } = await instance.post('/user/reissue', {
          refreshToken,
        });
        // 새로운 토큰 저장
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data;

        setCookie('accessToken', newAccessToken);
        setCookie('refreshToken', newRefreshToken);

        instance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
