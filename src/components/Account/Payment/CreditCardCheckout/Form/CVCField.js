import React from 'react';
import {FormControl, FormGroup} from "react-bootstrap";
import MaskedFormControl from "react-bootstrap-maskedinput";

const CVCField = props => (
  <FormGroup>
    <FormControl
      as={MaskedFormControl}
      mask="111"
      type="password"
      className={"form-control auth-form__input"}
      placeholder={"CVC"}
      name={"cvc"}
      {...props}
    />
    <FormControl.Feedback type="invalid">
      {props.errors}
    </FormControl.Feedback>
  </FormGroup>
);

export default CVCField;
