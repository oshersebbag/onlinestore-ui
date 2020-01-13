import * as yup from 'yup';

export default yup.object().shape({
    name: yup.string()
    .required("name is required")
    .min(2, "name is too short")
    .max(25, "name is too long"),
    model: yup.string()
    .required("model is required")
    .min(2, "model is too short")
    .max(35, "model is too long"),
    brand: yup.string()
    .required("brand is required")
    .min(2, "brand is too short")
    .max(15, "brand is too long"),
    short: yup.string()
    .required("short description is required")
    .min(2, "short description is too short"),
    description: yup.string()
    .required("description is required")
    .min(2, "description is too short"),
    price: yup.number().required("price is required"),
    categoryId: yup.string().required("CategoryId is required"),
    image: yup.mixed().required()
});