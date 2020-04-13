import React from 'react';
import { FormControl, FormGroup } from "react-bootstrap";

export default (props) => (
    <FormGroup className={props.groupClassName ? props.groupClassName : "form-group auth-form__input-wrap"}>
        <FormControl
            type="email"
            className={"form-control auth-form__input"}
            placeholder={"Email"}
            name={"email"}
            {...props}
        />
        <FormControl.Feedback type="invalid">
            {props.errors}
        </FormControl.Feedback>
    </FormGroup>
);