import * as Yup from 'yup';

export default Yup.object().shape({
    firstName: Yup.string()
        .min(3, 'At least 3 characters long')
        .max(255, 'At most 255 characters long')
        .required('Required'),
    lastName: Yup.string()
        .min(3, 'At least 3 characters long')
        .max(255, 'At most 255 characters long')
        .required('Required')
});
