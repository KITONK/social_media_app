import * as yup from "yup";

export const SignupValidation = yup.object().shape({
    name: yup.string().min(2, "Too short").required("Field is required"),
    username: yup.string().min(2, "Too short").required("Field is required"),
    email: yup.string().email().required("Field is required"),
    password: yup.string().min(8, "Password must be at least 8 characters.").required("Field is required"),
});

export const SignupInitialValues = {
    name: "",
    username: "",
    email: "",
    password: ""
};

export const SigninValidation = yup.object().shape({
    email: yup.string().email().required("Field is required"),
    password: yup.string().min(8, "Password must be at least 8 characters.").required("Field is required"),
});

export const SigninInitialValues = {
    email: "",
    password: ""
};

// export const PostValidation = z.object({
//     caption: z.string().min(5).max(2200),
//     file: z.custom<File[]>(),
//     location: z.string().min(2).max(100),
//     tags: z.string(),
// });