import React, { Fragment } from 'react';
import TickSuccess from '../../../icons/TickSuccess';
import './index.scss';

export default (props) => (
    <Fragment>
        <div className={"auth-form__alert auth-form__alert--success"} {...props}>
            <TickSuccess/>
            {props.children}
        </div>
    </Fragment>
);