import Cookies from 'js-cookie';
import { refreshTokenRequest } from './norma-api';

function useToken() {
  const { accessToken, refreshToken } = Cookies.get();

  const clearAllTokens = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
  };

  const addTokens = ({ accessToken: newAccessToken, refreshToken: newRefreshToken }) => {
    const token = newAccessToken.split('Bearer ')[1];
    Cookies.set('accessToken', token, { expires: 1 / 24 / 3 });
    Cookies.set('refreshToken', newRefreshToken, { expires: 7 });
    return token;
  };

  const getToken = async () => {
    if (accessToken) {
      return accessToken;
    }

    if (!refreshToken) {
      return null;
    }

    const data = await refreshTokenRequest({ token: refreshToken });
    if (data.accessToken) {
      addTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken });
    }
    return null;
  };

  return {
    getToken,
    clearAllTokens,
    addTokens,
    accessToken,
    refreshToken,
  };
}

export default useToken;
