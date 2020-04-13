import React, { useState, useRef } from 'react';
import Tooltip from '../Tooltip';
import './index.scss';
import useClickOutside from '../../hooks/clickOutside';

const DropdownMenu = (props) => {
    const [ open, setOpen ] = useState(false);
    const ref = useRef(null);
    const handleClickOutside = (e) => {
        setOpen('');
    };

    useClickOutside(ref, handleClickOutside);

    return (
        <div className="sho-dropdown-menu" ref={ref}>
            <div className="sho-dropdown-menu__toggle" onClick={() => setOpen(!open)}>
                {
                    props.icon
                        ? props.icon
                        : <span className="icon icon--chevron icon--chevron-down" />
                }
            </div>

            <Tooltip className="sho-dropdown-menu__tooltip" show={open} onClick={() => setOpen(!open)}>
                { props.children }
            </Tooltip>
        </div>
    );
};

export default DropdownMenu;