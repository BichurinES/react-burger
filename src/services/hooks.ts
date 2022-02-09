import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook,
} from 'react-redux';
import { useLocation as locationHook } from 'react-router-dom';
import { RootState, AppDispatch, AppThunk } from './store';
import { TLocation } from './types';

export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();
export const useLocation = () => locationHook<TLocation>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
