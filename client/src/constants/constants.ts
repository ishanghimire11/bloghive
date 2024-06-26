import { SignUpField, SignInField } from "@/types/types";

export const signupFields: SignUpField[] = [
  {
    name: "username",
    label: "Username",
    type: "text",
    placeholder: "Username",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Email address",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Password",
    required: true,
  },
];

export const signinFields: SignInField[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Email address",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Password",
    required: true,
  },
];
