import React from 'react';
import {connect} from "react-redux";
import { hide } from "./logic/modalActions";
import {bindActionCreators} from "redux";
import ConfirmDeleteModal from '../../../Modal/ConfirmDeleteModal';
import { remove } from '../../logic/folderActions';

const DeleteFolderModal = (props) => {
    const handleCancel = () => {
        props.hide();
    };

    const handleDelete = () => {
        props.remove(props.deleteFolderModal.id);
        props.hide();
    };

    return (
        <ConfirmDeleteModal
            title="Delete folder?"
            show={props.deleteFolderModal.show}
            handleCancel={handleCancel}
            handleDelete={handleDelete}
        />
    );
};


const mapStateToProps = state => ({
    deleteFolderModal: state.deleteFolderModal
});

const mapDispatchToProps = dispatch => ({
    hide: bindActionCreators(hide, dispatch),
    remove: bindActionCreators(remove, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteFolderModal);