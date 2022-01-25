import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

function PasswordPlaceholderInput({
  type, placeholder, value, name, size, onChange,
}) {
  const passwordRef = useRef(null);
  const [passwordIcon, setPasswordIcon] = useState('ShowIcon');
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (passwordRef) {
      passwordRef.current.minLength = 6;
    }
  }, [passwordRef]);

  function onIconClick() {
    const icon = passwordIcon === 'ShowIcon' ? 'HideIcon' : 'ShowIcon';
    setPasswordIcon(icon);
    passwordRef.current.type = passwordIcon === 'ShowIcon' ? 'text' : 'password';
    passwordRef.current.focus();
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
}

PasswordPlaceholderInput.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PasswordPlaceholderInput;
