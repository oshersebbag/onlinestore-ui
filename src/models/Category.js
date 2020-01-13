import * as yup from 'yup';

export default yup.object().shape({
    name: yup.string()
    .required("name is required")
    .min(2, "name is too short")
    .max(25, "name is too long"),
    image: yup.mixed().required()
});