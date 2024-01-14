import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { IconButton, InputAdornment, Typography } from "@mui/material";

import * as S from "./styles";
import Loader from "@/components/Loader/Loader";
import Button from "@/components/Button/Button";
import Textfield from "@/components/Textfield/Textfield";
import { SigninValuesType } from "../types";
import { useUserContext } from "@/context/AuthContext";
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { SigninInitialValues, SigninValidation } from "@/lib/validations";

const SigninForm = () => {
  const navigate = useNavigate();
  const { mutateAsync: signInAccount } = useSignInAccount();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const [showPassword, setShowPassword] = useState(false);

  const { values, errors, isValid, touched, resetForm, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: SigninInitialValues,
    validationSchema: SigninValidation,
    onSubmit,
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  async function onSubmit(values: SigninValuesType) {
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
      return toast.error("Sign in failed. Please try again.");
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
        Log in to your account
      </S.Title>
      <S.Description
        fontSize="16px"
        fontWeight={400}
        lineHeight="140%"
        textAlign="center"
        marginTop="8px"
        color="violet.dark"
      >
        Welcome back! Please enter your details
      </S.Description>

      <S.Form onSubmit={handleSubmit}>
        <S.TextfieldWrapper>
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
          {isUserLoading ? (
            <S.LoaderWrapper>
              <Loader /> Loading...
            </S.LoaderWrapper>
          ) : (
            "Sign in"
          )}
        </Button>

        <S.BottomText>
          Don't have an account?
          <Link to="/sign-up">
            <Typography
              display="block"
              fontWeight={600}
              marginLeft="6px"
              fontSize="16px"
              lineHeight="24px"
              color="violet.light"
            >
              Sign up
            </Typography>
          </Link>
        </S.BottomText>
      </S.Form>
    </S.Wrapper>
  );
};

export default SigninForm;
