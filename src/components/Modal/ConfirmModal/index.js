import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './index.scss';

const ConfirmModal = (props) => {
    return (
        <Modal className="sho-modal sho-modal--delete" show={props.show} onHide={props.handleCancel}>
            <Modal.Header>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {props.text}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={props.handleCancel}>
                  {props.cancelBtnText}
                </Button>
                <Button variant="success" onClick={props.handleConfirm}>
                  {props.confirmBtnText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

ConfirmModal.propTypes = {
    show: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleConfirm: PropTypes.func.isRequired,
    cancelBtnText: PropTypes.string.isRequired,
    confirmBtnText: PropTypes.string.isRequired,
};

export default ConfirmModal;
