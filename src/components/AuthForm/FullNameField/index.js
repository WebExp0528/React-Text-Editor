import React, { Fragment } from 'react';
import FirstNameField from '../FirstNameField';
import LastNameField from '../LastNameField';


export default (props) => (
    <Fragment>
        <FirstNameField {...props.firstName} />
        <LastNameField {...props.lastName} />
    </Fragment>
);