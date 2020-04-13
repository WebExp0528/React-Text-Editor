import React from 'react';
import StoryList from "../../Story/StoryList";
import FolderList from "../../Folder/FolderList";
import './index.scss';

const SearchResults = ({ results }) => (
    <>
        <div className="search__results-block search__results-block--stories">
            <div className="search__results-block-title">Stories</div>
            {
                results && results.stories.length
                    ? <StoryList stories={results.stories} compact={true}/>
                    : 'No stories'
            }
        </div>
        <div className="search__results-block search__results-block--folders">
            <div className="search__results-block-title">Folders</div>
            {
                results && results.folders.length
                    ? <FolderList folders={results.folders} compact={true}/>
                    : 'No folders'
            }
        </div>
    </>
);

export default SearchResults;