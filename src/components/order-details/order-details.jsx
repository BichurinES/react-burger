import styles from './order-details.module.css';
import Modal from '../modal/modal';
import donePath from '../../images/done-animation.gif';

function OrderDetails({ orderId, closeAllPopups }) {
  return (
    <Modal closeAllPopups={closeAllPopups}>
      <p className={`${styles["order-id"]} text text_type_digits-large mt-4 mb-8`}>{orderId}</p>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <img src={donePath} alt="Анимация успешного завершения заказа" className={`${styles.image} mt-15 mb-15`} />
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mb-30">Дождитесь готовности на орбитальной станции</p>
    </Modal>
  )
}

export default OrderDetails;
