import PropTypes from 'prop-types';
import styles from './error-popup.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';

function ErrorPopup({ content }) {
  return (
    <Modal>
      <div className={styles.error}>
        <CloseIcon type="error" />
      </div>
      <h3 className="text text_type_main-large mt-10 mb-25">{content || 'Ошибка сервера'}</h3>
    </Modal>
  )
}

ErrorPopup.propTypes = {
  content: PropTypes.string.isRequired,
}

export default ErrorPopup;
