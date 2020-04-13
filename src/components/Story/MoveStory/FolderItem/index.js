import React from 'react';
import { select } from "../logic/modalActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import './index.scss';

const FolderItem = ({ folder, select, moveStoryModal }) => {

    return (
        <li className={`folder-item folder-item--move ${moveStoryModal.selected && moveStoryModal.selected.id === folder.id ? 'folder-item--selected' : ''}`} onClick={() => select(folder)}>
            <div className="folder-item__title">{folder.name}</div>
            <div className="folder-item__description">
                <div className="folder-item__items">
                    <span className="icon icon--folder" />
                    {folder.stories.length} {folder.stories.length === 1 ? 'Story' : 'Stories' }
                </div>
            </div>
        </li>
    );
};

const mapStateToProps = state => ({
    moveStoryModal: state.moveStoryModal
});

const mapDispatchToProps = dispatch => ({
    select: bindActionCreators(select, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FolderItem);