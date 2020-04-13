import React from 'react';
import Tooltip from './index';

const BoldTooltip = ({ show }) => (
    <Tooltip show={show} variant="bold">
        <div className="bold-omitwrapper">
            <button className="bold-omit">
                Omit
            </button>
        </div>
        <p className="bold-message">Be bold, don’t hedge. Omit or rephrase your idea.</p>
    </Tooltip>
);

export default BoldTooltip;
