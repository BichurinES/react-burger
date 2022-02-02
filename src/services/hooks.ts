import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook,
} from 'react-redux';
import { useLocation as locationHook } from 'react-router-dom';
import { RootState, AppDispatch } from './store';
import { TLocation } from './types';

export const useDispatch = () => dispatchHook<AppDispatch>();
export const useLocation = () => locationHook<TLocation>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
