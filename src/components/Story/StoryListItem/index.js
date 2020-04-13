import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import './index.scss';
import DropdownMenu from '../../DropdownMenu';
import DropdownMenuItem from '../../DropdownMenu/DropdownMenuItem';
import { remove, update } from "../logic/storyActions";
import { show } from '../MoveStory/logic/modalActions';
import { show as showDeleteModal } from './DeleteStoryModal/logic/modalActions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const StoryListItem = ({ story, folder, compact, ...props }) => (
    <li className={`story-item ${compact ? 'story-item--compact' : ''}`}>
        <Link to={`/stories/${story.id}`} className="story-item__title">{story.title ? story.title : 'Unnamed story'}</Link>
        <div className="story-item__description">
            <div className="story-item__folder">{
              folder
                ? <Link className="story-item__folder-link" to={`/folders/${folder.id}`}>{folder.name}</Link>
                : story.folder
                  ? <Link className="story-item__folder-link"  to={`/folders/${story.folder.id}`}>{story.folder.name}</Link>
                  : 'Unfiled'
            }</div>
            <div className="story-item__updated">Last edited <Moment fromNow>{story.updated}</Moment></div>
            {
                !compact &&
                <div className="story-item__read-info">{story.readTime || 0} min<div className="story-item__read-info-hide">&nbsp;read ({story.wordCount || 0} words)</div></div>
            }
            {
              !compact &&
              <div className="story-item__menu">
                <DropdownMenu>
                  <DropdownMenuItem onClick={() => props.show(story)}>Move to</DropdownMenuItem>
                  <DropdownMenuItem><Link to={`/stories/${story.id}`}>Edit Story</Link></DropdownMenuItem>
                  {
                    (folder || story.folder) &&
                    <DropdownMenuItem onClick={() => props.update({...story, folder: null})}>Remove from</DropdownMenuItem>
                  }
                  <DropdownMenuItem className="sho-dropdown-menu__item--remove" onClick={() => props.showDeleteModal(story.id)}>Delete Story</DropdownMenuItem>
                </DropdownMenu>
              </div>
            }
        </div>
    </li>
);

const mapDispatchToProps = dispatch => ({
    update: bindActionCreators(update, dispatch),
    remove: bindActionCreators(remove, dispatch),
    show: bindActionCreators(show, dispatch),
    showDeleteModal: bindActionCreators(showDeleteModal, dispatch),
});

export default connect(null, mapDispatchToProps)(StoryListItem);
