import * as yup from 'yup';
// import { defaultImage } from './image';

export const formSchema = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().positive().integer().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .min(8)
    .required()
    .oneOf([yup.ref('password')]),
  gender: yup.string().required(),
  consentWithRules: yup.boolean().isTrue().required(),
  country: yup.string().required(),
  // img: yup.string().min(2).required().notOneOf([defaultImage]),
  img: yup.string().min(2).required(),
});