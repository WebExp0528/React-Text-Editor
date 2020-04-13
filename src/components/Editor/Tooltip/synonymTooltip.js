import React from 'react';
import Tooltip from './index';
import './synonym.scss';

const SynonymTooltip = ({ show }) => (
    <Tooltip show={show} variant="synonym">
        <div className="synonym-tooltip__words"></div>
    </Tooltip>
);

export default SynonymTooltip;
