import React, { useState } from 'react';
import {Link} from "react-router-dom";
import DropdownMenu from "../../DropdownMenu";
import DropdownMenuItem from "../../DropdownMenu/DropdownMenuItem";
import {show as showMoveModal} from "../../Story/MoveStory/logic/modalActions";
import {show as showDeleteModal} from "../../Story/StoryListItem/DeleteStoryModal/logic/modalActions";
import { update } from '../../Story/logic/storyActions';
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import ShortcutsModal from "../ShortcutsModal";

const BackBlock = props => {
    const [ shortcuts, setShortcuts ] = useState(false);
    const handleModalHide = () => {
      setShortcuts(false);
    };
    let { single: story } = props.stories;

    return (
        <div className="edit-page__back">
            <Link to="/" className="edit-page__back-link">
                <span className="icon icon--chevron"></span>
            </Link>
            <div className="edit-page__back-link-block">
                <Link to="/" className="edit-page__back-link">
                    <span className="edit-page__back-link-text">Back to Stories</span>
                </Link>
                <span className="edit-page__back-folder">
                  {
                      story && story.folder
                          ? <Link className='edit-page__back-folder-link' to={`/folders/${story.folder.id}`}>{story.folder.name}</Link>
                          : 'Unfiled'
                  }
                </span>
            </div>
            <div className="edit-page__back-menu">
                <DropdownMenu icon={<span className="icon icon--dots"></span>}>
                    <DropdownMenuItem onClick={() => setShortcuts(true)}>Key Shortcuts</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => props.showMoveModal(story)}>Move to</DropdownMenuItem>
                    {
                        story && story.folder &&
                        <DropdownMenuItem onClick={() => props.update({ ...story, folder: null })}>Remove from</DropdownMenuItem>
                    }
                    <DropdownMenuItem className="sho-dropdown-menu__item--remove" onClick={() => props.showDeleteModal(story.id)}>Delete Story</DropdownMenuItem>
                </DropdownMenu>
            </div>
            <ShortcutsModal show={shortcuts} onHide={handleModalHide} />
        </div>
    );
};

const mapStateToProps = state => ({
    stories: state.stories
});

const mapDispatchToProps = dispatch => ({
    update: bindActionCreators(update, dispatch),
    showMoveModal: bindActionCreators(showMoveModal, dispatch),
    showDeleteModal: bindActionCreators(showDeleteModal, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BackBlock);
