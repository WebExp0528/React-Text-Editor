import React  from 'react';
import {connect} from "react-redux";
import { hide } from "./logic/modalActions";
import { show } from "./CreateFolder/logic/modalActions";
import { getAll } from "../../Folder/logic/folderActions";
import { update } from "../../Story/logic/storyActions";
import {bindActionCreators} from "redux";
import { Modal, Button } from 'react-bootstrap';
import FolderList from './FolderList';
import Loader from "../../Loader";
import './index.scss';
import usePrefetchData from '../../../hooks/prefetchData';
import CreateFolderModal from './CreateFolder';

const MoveStory = ({ getAll, ...props }) => {
    const { data, loading } = props.folders;
    const handleCancel = () => {
        props.hide();
    };
    const handleMove = () => {
        props.update({
            id: props.moveStoryModal.story.id,
            folder: props.moveStoryModal.selected['@id']
        });
        props.hide();
    };

    usePrefetchData(data, getAll, loading);

    return (
        <>
            <Modal className="sho-modal sho-modal--move-story" show={props.moveStoryModal.show} onHide={handleCancel}>
                {
                    props.moveStoryModal.story &&
                        <>
                            <Modal.Header>
                                <Modal.Title>Move your story to...</Modal.Title>
                                <button className="btn-unstyled modal-header__btn" onClick={() => {
                                    props.hide();
                                    props.show();
                                }}>New Folder</button>
                            </Modal.Header>
                            <Modal.Body>
                                {
                                    loading
                                        ? <Loader/>
                                        : data.length
                                            ? <FolderList folders={data}/>
                                            : 'No folders'
                                }
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="outline-secondary" onClick={handleCancel}>
                                    Cancel
                                </Button>
                                <Button variant="success" disabled={
                                    !props.moveStoryModal.selected
                                    || (props.moveStoryModal.story.folder
                                        && props.moveStoryModal.selected.id === props.moveStoryModal.story.folder.id
                                    )
                                } onClick={handleMove}>
                                    Move
                                </Button>
                            </Modal.Footer>
                        </>
                }
            </Modal>
            <CreateFolderModal story={props.moveStoryModal.story} />
        </>
    );
};

const mapStateToProps = state => ({
    moveStoryModal: state.moveStoryModal,
    folders: state.folders,
});

const mapDispatchToProps = dispatch => ({
    hide: bindActionCreators(hide, dispatch),
    show: bindActionCreators(show, dispatch),
    getAll: bindActionCreators(getAll, dispatch),
    update: bindActionCreators(update, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MoveStory);