import React from 'react';
import FolderItem from '../FolderItem';

const FolderList = ({ folders }) => {
    return (
        <div>
            <ul className="list-unstyled">
                {folders.map(folder => <FolderItem key={folder.id} folder={folder} />)}
            </ul>
        </div>
    );
};

export default FolderList;