import React, {
  useState, useRef, useEffect, FC,
} from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { TInput, TIcons } from '../../services/types/ui-components';

const PasswordPlaceholderInput: FC<TInput> = ({
  type, placeholder, value, name, size, onChange,
}) => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const [passwordIcon, setPasswordIcon] = useState<TIcons>('ShowIcon');
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (passwordRef && passwordRef.current) {
      passwordRef.current.minLength = 6;
    }
  }, [passwordRef]);

  function onIconClick() {
    const icon = passwordIcon === 'ShowIcon' ? 'HideIcon' : 'ShowIcon';
    setPasswordIcon(icon);
    if (passwordRef && passwordRef.current) {
      passwordRef.current.type = passwordIcon === 'ShowIcon' ? 'text' : 'password';
      passwordRef.current.focus();
    }
  }

  return (
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      error={!isValid}
      icon={passwordIcon}
      size={size}
      onChange={(e) => {
        onChange(e);
        setIsValid(e.currentTarget.validity.valid);
      }}
      onIconClick={() => onIconClick()}
      ref={passwordRef}
      errorText="Некорректный пароль"
    />
  );
};

export default PasswordPlaceholderInput;
