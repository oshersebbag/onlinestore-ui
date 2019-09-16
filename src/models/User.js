import * as yup from 'yup';

export default yup.object().shape({
    firstName: yup.string()
    .required("First name is required")
    .min(2, "First name is too short")
    .max(25, "First name is too long"),
    lastName: yup.string()
    .required("Last name is required")
    .min(2, "Last name is too short")
    .max(15, "Last name is too long"),
    email: yup.string().email().required(),
    password: yup.string().required("password is required").min(5, "password should contain at least 5 characters")
    .max(15, "password is too long"),
    rePassword: yup.string().required("please confirm password")
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
    bday: yup.string().test("adult", "you must be at least 18 years old", 
        function(value) {
            var birth = new Date(value);
            var dt = new Date();
            var age = dt.getFullYear() - birth.getFullYear();
            var m = dt.getMonth() - birth.getMonth();
            if (m < 0 || (m === 0 && dt.getDate() < birth.getDate())) {
                age--;
            } 
            return age >= 18;        
        }).test("tooadult", "please enter a valid date of birth", 
        function(value) {
            var birth = new Date(value);
            var dt = new Date();
            var age = dt.getFullYear() - birth.getFullYear();
            var m = dt.getMonth() - birth.getMonth();
            if (m < 0 || (m === 0 && dt.getDate() < birth.getDate())) {
                age--;
            } 
            return age<100;        
        }),
        // consent: yup.bool()
        // .test(
        //   'consent',
        //   'You have to agree with our Terms and Conditions',
        //   value => value === true
        // )
});