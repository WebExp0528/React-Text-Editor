import React from 'react';
import logoFull from './img/logo-lg.svg';
import logo from './img/logo.svg';
import './index.scss';
import { Link } from 'react-router-dom';

export default ({ className, full }) => (
    <Link to="/" className={`logo ${className ? className : ''}`}>
      <img src={full ? logoFull : logo} alt={"Shosho"} className="logo__img" />
    </Link>
)
