import * as Yup from 'yup';

export default Yup.object().shape({
    oldPassword: Yup.string()
        .matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{7,}/, 'Must be seven characters long and contain one digit, one uppercase letter and one lowercase letter')
        .required('Required'),
    newPassword: Yup.string()
        .matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{7,}/, 'Must be seven characters long and contain one digit, one uppercase letter and one lowercase letter')
        .required('Required'),
    newRetypedPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], "Passwords do not match")
        .required('Required')
});
