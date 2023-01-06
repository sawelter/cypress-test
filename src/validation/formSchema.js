import * as yup from 'yup';

const formSchema = yup.object().shape({
    first_name: yup
        .string()
        .trim()
        .required("First name is required.")
        .min(2, "First name must be more than one character.")
        .max(20, "First name must be 20 characters or fewer."),
    last_name: yup
        .string()
        .trim()
        .required("Last name is required.")
        .min(2, "Last name must be more than one character.")
        .max(40, "Last name must be 40 characters or fewer."),
    email: yup
        .string()
        .trim()
        .email("Must be a valid email address.")
        .required("Email is required."),
    password: yup
        .string()
        .trim()
        .min(8, "Minimum password length is eight characters.")
        .max(20, "Maximum password length is 20 characters."),
    tos: yup
        .boolean()
        .oneOf([true], "This field must be checked."),
});



export default formSchema;