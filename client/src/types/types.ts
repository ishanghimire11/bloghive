export type HeaderSearch = {
  query: string;
};

export type UserSignUp = {
  email: string;
  password: string;
  username: string;
  photoUrl?: string;
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

export interface UserState {
  currentUser: ICurrentUser | null;
  error: null | string;
  loading: boolean;
}

export interface ICurrentUser {
  createdAt: string;
  email: string;
  photoUrl: string;
  updatedAt: string;
  username: string;
  _id: string;
  __v: number;
}

export type DashboardTabsProps = {
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
};
