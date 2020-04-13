import React from 'react';
import Tooltip from './index';

const simplerTooltip = ({ show }) => (
    <Tooltip show={show} variant="simpler">
        <div className="simpler-omitwrapper">
            <button className="simpler-omit">
                
            </button>
        </div>
        <p className="simpler-message">"<span className="simpler-insert adverb-bold"></span>" is too complex. Replace or omit.</p>
    </Tooltip>
);

export default simplerTooltip;
