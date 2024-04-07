export type HeaderSearch = {
  query: string;
};

export type UserSignUp = {
  email: string;
  password: string;
  username: string;
};

export interface SignUpField {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
}

export type UserSignIn = {
  email: string;
  password: string;
};

export interface SignInField {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
}
