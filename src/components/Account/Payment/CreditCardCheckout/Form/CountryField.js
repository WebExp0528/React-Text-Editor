import React from 'react';
import {FormControl, FormGroup} from "react-bootstrap";
import Select from 'react-select';
import { getCodeList } from 'country-list';
import './country.scss';

const codeList = getCodeList();
const names = Object.keys(codeList).map(key => { return { value: key, label: codeList[key] } });

const CountryField = props => (
  <FormGroup className="country-input__group">
    <FormControl
      {...props}
      as={Select}
      className={"auth-form__input country-input"}
      classNamePrefix="country-input"
      placeholder={"Country"}
      name={"country"}
      options={names}
      isSearchable={true}
      value={names.find(name => name.value === props.value)}
    />
    <FormControl.Feedback type="invalid">
      {props.errors}
    </FormControl.Feedback>
  </FormGroup>
);

export default CountryField;
