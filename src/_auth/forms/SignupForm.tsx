import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, Typography } from "@mui/material";

import * as S from "./styles";
import Loader from "@/components/Loader/Loader";
import Button from "@/components/Button/Button";
import Textfield from "@/components/Textfield/Textfield";
import { SignupValuesType } from "../types";
import { useUserContext } from "@/context/AuthContext";
import { SignupInitialValues, SignupValidation } from "@/lib/validations";
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations";

const SignupForm = () => {
  const navigate = useNavigate();
  const { checkAuthUser } = useUserContext();
  const { mutateAsync: signInAccount } = useSignInAccount();
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount();

  const [showPassword, setShowPassword] = useState(false);

  const { values, errors, isValid, touched, resetForm, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: SignupInitialValues,
    validationSchema: SignupValidation,
    onSubmit,
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  async function onSubmit(values: SignupValuesType) {
    const newUser = await createUserAccount(values);

    if (!newUser) return toast.error("Sign up failed. Please try again.");

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) return toast.error("Sign in failed. Please try again.");

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      resetForm();
      navigate("/");
    } else {
      return toast.error("Sign up failed. Please try again.");
    }
  }

  return (
    <S.Wrapper>
      <img src="/assets/images/logo.svg" alt="logo" />

      <S.Title
        fontSize="30px"
        fontWeight={700}
        lineHeight="140%"
        letterSpacing="-1.8px"
        textAlign="center"
        color="primary.main"
      >
        Create a new account
      </S.Title>
      <S.Description
        fontSize="16px"
        fontWeight={400}
        lineHeight="140%"
        textAlign="center"
        marginTop="8px"
        color="violet.dark"
      >
        To use Snapgram, please enter your details
      </S.Description>

      <S.Form onSubmit={handleSubmit}>
        <S.TextfieldWrapper>
          <Textfield
            id="name"
            name="name"
            type="name"
            value={values.name}
            labelText="name"
            placeholder="John"
            required
            errorText={errors.name && touched.name ? errors.name : null}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Textfield
            id="username"
            name="username"
            type="username"
            value={values.username}
            labelText="username"
            placeholder="johnny"
            required
            errorText={errors.username && touched.username ? errors.username : null}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Textfield
            id="email"
            name="email"
            type="email"
            value={values.email}
            labelText="email"
            placeholder="john@gmail.com"
            required
            errorText={errors.email && touched.email ? errors.email : null}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Textfield
            id="password"
            name="password"
            type={!showPassword ? "password" : "text"}
            value={values.password}
            labelText="password"
            placeholder="*********"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" style={{ zIndex: 1 }}>
                  <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            errorText={errors.password && touched.password ? errors.password : null}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </S.TextfieldWrapper>
        <Button type="submit" disabled={!isValid}>
          {isCreatingAccount ? (
            <S.LoaderWrapper>
              <Loader /> Loading...
            </S.LoaderWrapper>
          ) : (
            "Sign up"
          )}
        </Button>

        <S.BottomText>
          Already have an account?
          <Link to="/sign-in">
            <Typography
              display="block"
              fontWeight={600}
              marginLeft="6px"
              fontSize="16px"
              lineHeight="24px"
              color="violet.light"
            >
              Log in
            </Typography>
          </Link>
        </S.BottomText>
      </S.Form>
    </S.Wrapper>
  );
};

export default SignupForm;
