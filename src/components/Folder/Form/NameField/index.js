import React from 'react';
import { FormControl, FormGroup } from "react-bootstrap";

export default (props) => (
    <FormGroup>
        <FormControl
            type="text"
            placeholder={"Give it a fancy name (but not too fancy)"}
            name={"name"}
            {...props}
        />
        <FormControl.Feedback type="invalid">
            {props.errors}
        </FormControl.Feedback>
    </FormGroup>
);