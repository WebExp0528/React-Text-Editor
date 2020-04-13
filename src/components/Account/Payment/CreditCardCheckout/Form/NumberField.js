import React from 'react';
import {FormControl, FormGroup} from "react-bootstrap";
import MaskedFormControl from "react-bootstrap-maskedinput";

const NumberField = props => (
  <FormGroup>
    <FormControl
      as={MaskedFormControl}
      type="text"
      className="auth-form__input"
      placeholder="···· ···· ···· ····"
      name="number"
      mask='1111 1111 1111 1111'
      {...props}
    />
    <FormControl.Feedback type="invalid">
      {props.errors}
    </FormControl.Feedback>
  </FormGroup>
);

export default NumberField;
