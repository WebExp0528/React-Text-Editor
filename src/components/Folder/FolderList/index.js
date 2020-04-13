import React from 'react';
import FolderListItem from '../FolderListItem';
import './index.scss';
import UpdateFolderModal from "../UpdateFolder";
import DeleteFolderModal from "../FolderListItem/DeleteFolderModal";

export default ({ folders, className, compact, ...props }) => (
    <>
        <ul className={`folder-list ${className ? className : ''}`}>
            {folders.map(folder => <FolderListItem key={folder.id} folder={folder} compact={compact} click={props.click} />)}
        </ul>
        <UpdateFolderModal/>
        <DeleteFolderModal />
    </>
);