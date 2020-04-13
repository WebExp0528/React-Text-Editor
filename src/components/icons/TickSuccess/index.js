import React from 'react';
import './index.scss';
import tick from './img/tick-green.svg';

export default () => {
  return (
    <div className="tick tick--success" style={{backgroundImage: `url(${tick})`}}></div>
  );
};