import reducer, { initialState } from './profile';
import {
  clearUserAction,
  editUserAction,
  editUserFailedAction,
  editUserSuccessAction,
  getUserAction,
  getUserFailedAction,
  getUserSuccessAction,
  logoutAction,
  logoutFailedAction,
  logoutSuccessAction,
  setUserAction,
  updateTokenAction,
} from '../actions/profile';
import { TEST_USER } from '../../utils/constants';

describe('profile reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined)).toEqual(initialState);
  });

  it('should handle UPDATE_TOKEN', () => {
    expect(reducer(undefined, updateTokenAction('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'))).toEqual({
      ...initialState,
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    });
  });

  it('should handle SET_USER', () => {
    expect(reducer(undefined, setUserAction(TEST_USER))).toEqual({
      ...initialState,
      user: TEST_USER,
    });
  });

  it('should handle CLEAR_USER', () => {
    expect(reducer({
      ...initialState,
      user: TEST_USER,
    }, clearUserAction())).toEqual(initialState);
  });

  it('should handle GET_USER_REQUEST', () => {
    expect(reducer(undefined, getUserAction())).toEqual({
      ...initialState,
      getUserRequest: true,
    });
  });

  it('should handle GET_USER_SUCCESS', () => {
    expect(reducer(undefined, getUserSuccessAction(TEST_USER))).toEqual({
      ...initialState,
      user: TEST_USER,
    });
  });

  it('should handle GET_USER_FAILED', () => {
    expect(reducer(undefined, getUserFailedAction())).toEqual({
      ...initialState,
      getUserFailed: true,
    });
  });

  it('should handle EDIT_USER_REQUEST', () => {
    expect(reducer(undefined, editUserAction())).toEqual({
      ...initialState,
      editUserRequest: true,
    });
  });

  it('should handle EDIT_USER_SUCCESS', () => {
    expect(reducer(undefined, editUserSuccessAction(TEST_USER))).toEqual({
      ...initialState,
      user: TEST_USER,
    });
  });

  it('should handle EDIT_USER_FAILED', () => {
    expect(reducer(undefined, editUserFailedAction())).toEqual({
      ...initialState,
      editUserFailed: true,
    });
  });

  it('should handle LOGOUT_REQUEST', () => {
    expect(reducer(undefined, logoutAction())).toEqual({
      ...initialState,
      logoutRequest: true,
    });
  });

  it('should handle LOGOUT_SUCCESS', () => {
    expect(reducer(undefined, logoutSuccessAction())).toEqual(initialState);
  });

  it('should handle LOGOUT_FAILED', () => {
    expect(reducer(undefined, logoutFailedAction())).toEqual({
      ...initialState,
      logoutFailed: true,
    });
  });
});
