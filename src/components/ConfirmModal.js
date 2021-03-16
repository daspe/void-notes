// Confirmation modal with simple confirm or cancel options; accepts msg string
import React from 'react';
import {
  Modal,
  Button,
} from 'react-bootstrap';

function ConfirmModal({ msg, closeConfirmModal, openConfirmModal, onConfirm }) {
  return (
    <Modal
      show={openConfirmModal}
      onHide={closeConfirmModal}
      backdrop="static"
      className="mt-4"
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>{msg}</div>
        <Button
          variant="secondary"
          className="mr-2"
          onClick={closeConfirmModal}
        >Cancel</Button>
        <Button
          variant="danger"
          onClick={onConfirm}
        >Confirm</Button>
      </Modal.Body>
    </Modal>
  );
}

export default ConfirmModal;