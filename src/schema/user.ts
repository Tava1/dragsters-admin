import * as yup from 'yup';

const createUserSchema = yup.object().shape({
  fullname: yup.string().required('Campo obrigatório.'),
  email: yup.string().required('Campo obrigatório.'),
  password: yup.string().min(4, "Mínimo de 4 caracteres.").required('Campo obrigatório.'),
  role: yup.string(),
});

const updateUserSchema = yup.object().shape({
  fullname: yup.string().required('Campo obrigatório.'),
  role: yup.string(),
});

export { createUserSchema, updateUserSchema };