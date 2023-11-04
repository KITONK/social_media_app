import { FieldName } from "@/_auth/types";

export const signUpForm = [
    {
      id: FieldName.name,
      name: FieldName.name,
      label: FieldName.name,
      type: "text",
    },
    {
      id: FieldName.username,
      name: FieldName.username,
      label: FieldName.username,
      type: "text",
    },
    {
      id: FieldName.email,
      name: FieldName.email,
      label: FieldName.email,
      type: "email",
    },
    {
      id: FieldName.password,
      name: FieldName.password,
      label: FieldName.password,
      type: "password",
    },
];