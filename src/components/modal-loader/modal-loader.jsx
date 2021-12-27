import React from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import Loader from '../loader/loader';

const modalRoot = document.getElementById('react-modals');

function ModalLoader() {
  return ReactDOM.createPortal(
    <ModalOverlay isLockApp>
      <Loader />
    </ModalOverlay>,
    modalRoot,
  );
}

export default ModalLoader;
