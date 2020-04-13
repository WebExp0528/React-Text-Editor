import React from 'react';
import './index.scss';

const DropdownMenuItem = (props) => (
    <button
        {...props}
        className={`btn-unstyled sho-dropdown-menu__item ${props.className ? props.className : ''}`}
    >
        {props.children}
    </button>
);

export default DropdownMenuItem;