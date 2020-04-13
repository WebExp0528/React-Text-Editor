import React from 'react';
import {FormControl, FormGroup} from "react-bootstrap";

const NameField = props => (
  <FormGroup>
    <FormControl
      type="text"
      className={"form-control auth-form__input"}
      placeholder={"Name on Credit Card"}
      name={"name"}
      {...props}
    />
    <FormControl.Feedback type="invalid">
      {props.errors}
    </FormControl.Feedback>
  </FormGroup>
);

export default NameField;
