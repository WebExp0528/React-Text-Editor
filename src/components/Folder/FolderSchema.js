import * as Yup from 'yup';

export default Yup.object().shape({
    name: Yup.string()
        .min(3)
        .max(255)
        .required('Required')
});
