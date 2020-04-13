import React from 'react';
import ContentImageBlock from '../../ContentImageBlock';
import image from './img/folderListEmpty.svg';
import './index.scss';

export default () => (
    <ContentImageBlock image={image} >
        <div className="folder-empty">
            <div className="folder-empty__title">
              A world of endless possibilities!
            </div>
            <div className="folder-empty__desc">
              One word at a time. Begin your journey by creating a new story.
            </div>
        </div>
    </ContentImageBlock>
);
