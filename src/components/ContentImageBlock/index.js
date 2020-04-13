import React from 'react';
import './index.scss';

export default ({ children, image }) => (
    <div className="content-image">
        <div className="content-image__left">
            {children}
        </div>
        <div className="content-image__right">
            <div className="content-image__img-wrap">
                <img className="content-image__img" src={image} alt='Shosho' />
            </div>
        </div>
    </div>
);
