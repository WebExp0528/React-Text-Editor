import React from 'react';
import {FormControl, FormGroup} from "react-bootstrap";
import MaskedFormControl from "react-bootstrap-maskedinput";

const DateField = props => (
  <FormGroup>
    <FormControl
      type="text"
      className={"form-control auth-form__input"}
      placeholder={"MM/YY"}
      name={"date"}
      as={MaskedFormControl}
      mask="11/11"
      {...props}
    />
    <FormControl.Feedback type="invalid">
      {props.errors}
    </FormControl.Feedback>
  </FormGroup>
);

export default DateField;
