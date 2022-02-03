import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './not-found.module.css';

const NotFound = () => {
  const { goBack } = useHistory();

  return (
    <section className={styles.container}>
      <p className={`${styles.code} text text_type_digits-large`}>404</p>
      <p className="text text_type_main-medium mt-4 mb-4">
        Похоже, что такой страницы не существует... Уточните адрес ссылки и попробуйте снова.
      </p>
      <Button type="secondary" size="large" onClick={() => goBack()}>Назад</Button>
    </section>
  );
};

export default NotFound;
