import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import DropdownMenu from "../../DropdownMenu";
import DropdownMenuItem from "../../DropdownMenu/DropdownMenuItem";
import { show } from "../UpdateFolder/logic/modalActions";
import { remove } from '../logic/folderActions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { show as showDeleteModal } from './DeleteFolderModal/logic/modalActions';

const FolderListItem = ({ folder, compact, ...props }) => (
    <li className={`folder-item ${compact ? 'folder-item--compact' : ''}`}>
        <Link to={`/folders/${folder.id}`} className="folder-item__title">{folder.name}</Link>
        <div className="folder-item__description">
            <div className="folder-item__items">
                <span className="icon icon--folder" />
                {folder.stories.length} {folder.stories.length === 1 ? 'Story' : 'Stories' }
            </div>
            {
              !compact &&
              <>
                <div className="folder-item__menu">
                  <DropdownMenu>
                    <DropdownMenuItem onClick={() => props.show(folder)}>Edit name</DropdownMenuItem>
                    <DropdownMenuItem className="sho-dropdown-menu__item--remove" onClick={() => props.showDeleteModal(folder.id)}>Delete Folder</DropdownMenuItem>
                  </DropdownMenu>
                </div>

              </>
            }
        </div>
    </li>
);

const mapDispatchToProps = dispatch => ({
    show: bindActionCreators(show, dispatch),
    showDeleteModal: bindActionCreators(showDeleteModal, dispatch),
    remove: bindActionCreators(remove, dispatch),
});

export default connect(null, mapDispatchToProps)(FolderListItem);
