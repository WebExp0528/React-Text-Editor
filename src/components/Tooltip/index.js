import React from 'react';
import './index.scss';

const Tooltip = (props) => (
    <div className={`sho-tooltip ${props.className ? props.className : ''} ${props.show ? ' show' : ''}`} onClick={props.onClick}>
          <span className="sho-tooltip__content">{props.children}</span>
    </div>
);

export default Tooltip;