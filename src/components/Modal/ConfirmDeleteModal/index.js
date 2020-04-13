import React from 'react';
import ConfirmModal from "../ConfirmModal";

const ConfirmDeleteModal = (props) => {
    return (
      <ConfirmModal
        text='It will be forever gone... in the blackhole.'
        cancelBtnText="Cancel"
        confirmBtnText='Delete'
        handleConfirm={props.handleDelete}
        {...props}
      />
    );
};

export default ConfirmDeleteModal;
