import reducer, { initialState } from './popups';
import {
  getOrderDetailsAction,
  getOrderDetailsSuccessAction,
  getOrderDetailsFailedAction,
  closeOrderDetailsAction,
  openErrorPopupAction,
  closeErrorPopupAction,
  openSuccessPopupAction,
  closeSuccessPopupAction,
} from '../actions/popups';
import { TEST_ERROR, TEST_ORDER_DETAILS, TEST_SUCCESS } from '../../utils/constants';

describe('popups reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined)).toEqual(initialState);
  });

  it('should handle GET_ORDER_DETAILS_REQUEST', () => {
    expect(reducer(undefined, getOrderDetailsAction())).toEqual({
      ...initialState,
      orderRequest: true,
    });
  });

  it('should handle GET_ORDER_DETAILS_SUCCESS', () => {
    expect(reducer(undefined, getOrderDetailsSuccessAction(TEST_ORDER_DETAILS))).toEqual({
      ...initialState,
      isOrderDetailsOpen: true,
      orderDetailsContent: TEST_ORDER_DETAILS,
    });
  });

  it('should handle GET_ORDER_DETAILS_FAILED', () => {
    expect(reducer(undefined, getOrderDetailsFailedAction())).toEqual(initialState);
  });

  it('should handle CLOSE_ORDER_DETAILS', () => {
    expect(reducer({
      ...initialState,
      isOrderDetailsOpen: true,
      orderDetailsContent: TEST_ORDER_DETAILS,
    }, closeOrderDetailsAction())).toEqual(initialState);
  });

  it('should handle OPEN_ERROR_POPUP', () => {
    expect(reducer(undefined, openErrorPopupAction(TEST_ERROR))).toEqual({
      ...initialState,
      isErrorPopupOpen: true,
      errorPopupContent: TEST_ERROR,
    });
  });

  it('should handle CLOSE_ERROR_POPUP', () => {
    expect(reducer({
      ...initialState,
      isErrorPopupOpen: true,
      errorPopupContent: TEST_ERROR,
    }, closeErrorPopupAction())).toEqual(initialState);
  });

  it('should handle OPEN_SUCCESS_POPUP', () => {
    expect(reducer(undefined, openSuccessPopupAction(TEST_SUCCESS))).toEqual({
      ...initialState,
      isSuccessPopupOpen: true,
      successPopupContent: TEST_SUCCESS,
    });
  });

  it('should handle CLOSE_SUCCESS_POPUP', () => {
    expect(reducer({
      ...initialState,
      isSuccessPopupOpen: true,
      successPopupContent: TEST_SUCCESS,
    }, closeSuccessPopupAction())).toEqual(initialState);
  });
});
