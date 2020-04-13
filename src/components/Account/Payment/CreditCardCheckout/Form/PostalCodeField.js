import React from 'react';
import {FormControl, FormGroup} from "react-bootstrap";

const PostalCodeField = props => (
  <FormGroup>
    <FormControl
      type="text"
      className={"form-control auth-form__input"}
      placeholder={"Postal code"}
      name={"postalCode"}
      {...props}
    />
    <FormControl.Feedback type="invalid">
      {props.errors}
    </FormControl.Feedback>
  </FormGroup>
);

export default PostalCodeField;
