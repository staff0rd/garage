import React from 'react';
import Modal from '@material-ui/core/Modal';

interface SimpleModalProps {
    open: boolean;
    body: JSX.Element;
    handleClose: () => void;
}

export const SimpleModal = (props: SimpleModalProps) => {
  return (
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {props.body}
      </Modal>

  );
}