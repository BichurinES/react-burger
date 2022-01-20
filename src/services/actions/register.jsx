import { registerRequest } from '../norma-api';
import { openErrorPopup } from './popups';
import { setUser } from './profile';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from '../../utils/action-types';
import useToken from '../token';

export const signUp = (form) => (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  const { addTokens } = useToken();
  return registerRequest(form)
    .then((data) => {
      const { user, accessToken, refreshToken } = data;
      addTokens({ accessToken, refreshToken });
      dispatch(setUser(user));
      dispatch({ type: REGISTER_SUCCESS });
      return data;
    })
    .catch((err) => {
      dispatch({ type: REGISTER_FAILED });
      dispatch(openErrorPopup(err));
    });
};
