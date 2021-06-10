import * as yup from 'yup';

const createProductSchema = yup.object().shape({
  product_name: yup.string().required('Campo obrigatório.'),
  product_fullname: yup.string().required('Campo obrigatório.'),
  brand: yup.string().required('Campo obrigatório.'),
  description: yup.string().required('Campo obrigatório.'),
  supply: yup.number().integer("Insira um número interiro positivo.").positive("Insira um número positivo.").required('Campo obrigatório.').typeError("Digite um valor válido"),
  price: yup.number().required('Campo obrigatório.').typeError("Digite um valor válido"),
});


const updateProductSchema = yup.object().shape({
  product_name: yup.string().required('Campo obrigatório.'),
  product_fullname: yup.string().required('Campo obrigatório.'),
  brand: yup.string().required('Campo obrigatório.'),
  description: yup.string().required('Campo obrigatório.'),
  supply: yup.number().integer("Insira um número interiro positivo.").positive("Insira um número positivo.").required('Campo obrigatório.').typeError("Digite um valor válido"),
  price: yup.number().required('Campo obrigatório.').typeError("Digite um valor válido"),
});

export { createProductSchema, updateProductSchema };