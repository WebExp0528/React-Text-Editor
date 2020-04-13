import React from 'react';
import Tooltip from './index';

const WrongTooltip = ({ show }) => (
    <Tooltip show={show}  variant="wrong">
        <div className="wrong-omitwrapper">
            <button className="wrong-omit">
                <span className="wrong-insert-correct"></span>
            </button>
        </div>
        <p className="wrong-message">Consider using an alternative.</p>
    </Tooltip>
);

export default WrongTooltip;