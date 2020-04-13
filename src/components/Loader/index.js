import React from 'react';
import { BarLoader } from 'react-spinners';
import './index.scss';

export default () => (
    <div className="loader">
        <BarLoader color={'#35B986'} width={100} widthUnit="%" height={3} />
    </div>
);
