import {
  ChangeEvent, MouseEvent, FocusEvent, RefObject,
} from 'react';

export type TConstructorElement = {
  type: 'top' | 'bottom' | undefined;
  isLocked: boolean | undefined;
  handleClose: (() => void) | undefined;
  text: string;
  thumbnail: string;
  price: number;
};

export type TInput = {
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  value: string;
  name: string;
  success?: boolean;
  error?: boolean;
  disabled?: boolean;
  icon?: TIcons;
  errorText?: string;
  size?: 'small' | 'default';
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onIconClick?: ((e: MouseEvent<HTMLDivElement>) => void);
  onBlur?: ((e?: FocusEvent<HTMLInputElement> | undefined) => void);
  onFocus?: ((e?: FocusEvent<HTMLInputElement> | undefined) => void);
  ref?: ((instance: HTMLInputElement | null) => void) | RefObject<HTMLInputElement> | null;
  key?: string | number | null
};

export type TIcons = 'CurrencyIcon' | 'BurgerIcon' | 'LockIcon'
| 'DragIcon' | 'DeleteIcon' | 'ArrowUpIcon' | 'ArrowDownIcon'
| 'MenuIcon' | 'CloseIcon' | 'CheckMarkIcon' | 'ListIcon' | 'ProfileIcon'
| 'EditIcon' | 'InfoIcon' | 'ShowIcon' | 'HideIcon' | 'LogoutIcon'
| 'DeleteIcon' | 'ArrowUpIcon' | 'ArrowDownIcon' | 'MenuIcon';
