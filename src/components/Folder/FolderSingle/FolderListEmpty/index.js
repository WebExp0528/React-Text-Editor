import React from 'react';
import ContentImageBlock from '../../../ContentImageBlock';
import image from './img/folderListEmpty.svg';

export default () => (
    <ContentImageBlock image={image} >
        <div className="folder-empty">
            <div className="folder-empty__title">
                Hmm there's no story yet...
            </div>
            <div className="folder-empty__desc">
              Looking for inspiration? Don’t wait. Create a new story and start writing.
            </div>
        </div>
    </ContentImageBlock>
);
