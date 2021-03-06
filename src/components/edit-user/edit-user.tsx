import React, { useState, useCallback, useEffect } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './edit-user.module.css';
import { editUser } from '../../services/actions/profile';
import ModalLoader from '../modal-loader/modal-loader';
import { useSelector, useDispatch } from '../../services/hooks';
import { TUser } from '../../services/types/data';

type TStateIsFieldsEdit = {
  [name: string]: boolean;
};

type TStateFormValues = {
  [name: string]: string;
};

const EditUser = () => {
  const dispatch = useDispatch();
  const { user, editUserRequest, logoutRequest } = useSelector((state) => state.profile);
  const [isFieldsEdit, setIsFieldsEdit] = useState<TStateIsFieldsEdit>({});
  const [formValues, setFormValues] = useState<TStateFormValues>({
    name: '',
    email: '',
    password: '******',
  });

  useEffect(() => {
    if (user) {
      setFormValues({ ...formValues, ...user });
    }
  }, [user]);

  const onIconClick = useCallback(
    (evt) => {
      const target = evt.currentTarget.previousElementSibling;
      const { name }: { name: keyof TUser } = target;
      const value = !isFieldsEdit[name];
      if (user) {
        setFormValues({
          ...formValues,
          [name]: user[name],
        });
        setIsFieldsEdit({
          ...isFieldsEdit,
          [name]: value,
        });
      }
    },
    [isFieldsEdit, formValues, user],
  );

  const cancelEditingForm = useCallback(
    () => {
      setIsFieldsEdit({});
      setFormValues({ ...formValues, ...user });
    },
    [formValues, user],
  );

  const handleEscPress = useCallback(
    (evt) => evt.key === 'Escape' && cancelEditingForm(),
    [cancelEditingForm],
  );

  const onChange = useCallback(
    (evt) => {
      const { name, value } = evt.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
    },
    [formValues],
  );

  const onSubmit = useCallback(
    (evt) => {
      evt.preventDefault();
      const editedInputs: { [name: string]: string } = {};
      Object.keys(isFieldsEdit)
        .forEach((key) => {
          if (isFieldsEdit[key]) editedInputs[key] = formValues[key];
        });
      dispatch(editUser(editedInputs));
      setIsFieldsEdit({});
    },
    [isFieldsEdit, formValues],
  );

  useEffect(() => {
    if (Object.values(isFieldsEdit).includes(true)) {
      document.addEventListener('keydown', handleEscPress);
    }
    return () => {
      document.removeEventListener('keydown', handleEscPress);
    };
  }, [isFieldsEdit, handleEscPress]);

  return (
    <>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="??????"
          value={formValues.name}
          name="name"
          icon={!isFieldsEdit.name ? 'EditIcon' : 'CloseIcon'}
          size="default"
          onIconClick={(e) => onIconClick(e)}
          onChange={(e) => onChange(e)}
          disabled={!isFieldsEdit.name}
        />
        <Input
          type="text"
          placeholder="??????????"
          value={formValues.email}
          name="email"
          icon={!isFieldsEdit.email ? 'EditIcon' : 'CloseIcon'}
          size="default"
          onIconClick={(e) => onIconClick(e)}
          onChange={(e) => onChange(e)}
          disabled={!isFieldsEdit.email}
        />
        <Input
          type="password"
          placeholder="????????????"
          value={formValues.password}
          name="password"
          icon={!isFieldsEdit.password ? 'EditIcon' : 'CloseIcon'}
          size="default"
          onIconClick={(e) => onIconClick(e)}
          onChange={(e) => onChange(e)}
          disabled={!isFieldsEdit.password}
        />
        {Object.values(isFieldsEdit).includes(true) ? (
          <div className={styles.controls}>
            <Button type="primary" size="medium">??????????????????</Button>
            <Button type="secondary" size="medium" onClick={cancelEditingForm}>????????????</Button>
          </div>
        ) : null}
      </form>
      {(editUserRequest || logoutRequest) && <ModalLoader />}
    </>
  );
};

export default EditUser;
