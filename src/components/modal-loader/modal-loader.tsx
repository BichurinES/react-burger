import React from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import Loader from '../loader/loader';

const ModalLoader = () => ReactDOM.createPortal(
  <ModalOverlay isLockApp>
    <Loader />
  </ModalOverlay>,
  document.getElementById('react-modals')!,
);

export default ModalLoader;
