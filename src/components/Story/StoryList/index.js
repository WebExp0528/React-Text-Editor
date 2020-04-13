import React from 'react';
import StoryListItem from '../StoryListItem';
import './index.scss';
import MoveStoryModal from '../MoveStory';
import DeleteStoryModal from "../StoryListItem/DeleteStoryModal";

export default ({ stories, folder, className, compact }) => (
    <>
        <ul className={`story-list ${className}`}>
            {stories.map(story => <StoryListItem key={story.id} story={story} folder={folder} compact={compact} />)}
        </ul>
        <MoveStoryModal />
        <DeleteStoryModal/>
    </>
);