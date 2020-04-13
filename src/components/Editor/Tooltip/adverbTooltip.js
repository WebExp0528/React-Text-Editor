import React from 'react';
import Tooltip from './index';

const AdverbTooltip = ({ show }) => (
    <Tooltip show={show} variant="adverb">
        <div className="adverb-omitwrapper">
            <button className="adverb-omit">
                Omit
            </button>
        </div>
        <p className="adverb-message">"<span className="adverb-insert adverb-bold"></span>" is an adverb. Be bold. Don't hedge.</p>
    </Tooltip>
);

export default AdverbTooltip;