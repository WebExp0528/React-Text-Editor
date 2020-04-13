import * as Yup from 'yup';

export default Yup.object().shape({
    name: Yup.string()
      .min(1, 'Required'),
    // number: Yup.string()
    //   .required('Required')
    //   .matches(/(\d{4} ){3}\d{4}/, 'Invalid number'),
    // date: Yup.string()
    //   .matches(/(0[1-9]|1[012])\/\d{2}/, 'Invalid date')
    //   .required('Required'),
    // cvc: Yup.string()
    //   .required('Required')
    //   .matches(/\d{3}/, 'Invalid code'),
    postalCode: Yup.string()
      .required('Required'),
    country: Yup.string()
      .length(2, 'Invalid country')
      .required('Required')
});
