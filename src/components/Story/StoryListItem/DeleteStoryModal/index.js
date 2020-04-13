import React from 'react';
import {connect} from "react-redux";
import { hide } from "./logic/modalActions";
import {bindActionCreators} from "redux";
import ConfirmDeleteModal from '../../../Modal/ConfirmDeleteModal';
import { remove } from '../../logic/storyActions';

const DeleteStoryModal = (props) => {
    const handleCancel = () => {
        props.hide();
    };

    const handleDelete = () => {
        props.remove(props.deleteStoryModal.id);
        props.hide();

        if (props.onDelete) {
            props.onDelete();
        }
    };

    return (
        <ConfirmDeleteModal
            title="Delete story?"
            show={props.deleteStoryModal.show}
            handleCancel={handleCancel}
            handleDelete={handleDelete}
        />
    );
};


const mapStateToProps = state => ({
    deleteStoryModal: state.deleteStoryModal
});

const mapDispatchToProps = dispatch => ({
    hide: bindActionCreators(hide, dispatch),
    remove: bindActionCreators(remove, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteStoryModal);