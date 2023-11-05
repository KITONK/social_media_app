import { SignInName, SignUpName } from "@/_auth/types";

export const signUpForm = [
    {
      id: "name",
      name: "name" as SignUpName,
      label: "name",
      type: "text",
    },
    {
      id: "username",
      name: "username" as SignUpName,
      label: "username",
      type: "text",
    },
    {
      id: "email",
      name: "email" as SignUpName,
      label: "email",
      type: "email",
    },
    {
      id: "password",
      name: "password" as SignUpName,
      label: "password",
      type: "password",
    },
];

export const signInForm = [
  {
    id: "email",
    name: "email" as SignInName,
    label: "email",
    type: "email",
  },
  {
    id: "password",
    name: "password" as SignInName,
    label: "password",
    type: "password",
  },
];