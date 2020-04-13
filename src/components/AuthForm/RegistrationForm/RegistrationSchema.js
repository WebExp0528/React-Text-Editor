import * as Yup from 'yup';

export default Yup.object().shape({
    firstName: Yup.string()
        .min(3, 'At least 3 characters long')
        .max(255, 'At most 255 characters long')
        .required('Required'),
    lastName: Yup.string()
        .min(3, 'At least 3 characters long')
        .max(255, 'At most 255 characters long')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{7,}/, 'Must be seven characters long and contain one digit, one uppercase letter and one lowercase letter')
        .required('Required'),
    retypedPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "Passwords do not match")
        .required('Required')
});
