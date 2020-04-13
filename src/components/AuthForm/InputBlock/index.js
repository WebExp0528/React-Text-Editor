import React from 'react';

export default (props) => (
    <div className={"auth-form__input-block"} {...props}>
        {props.children}
    </div>
);