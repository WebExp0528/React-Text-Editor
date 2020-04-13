import React from 'react';
import Tooltip from './index';

const PassiveTooltip = ({ show }) => (
    <Tooltip show={show} variant="passive">
        Passive voice. Use active voice.
    </Tooltip>
);

export default PassiveTooltip;