interface CustomError extends Error {
  statusCode?: number;
}

export type UserLoginData = {
  username: string;
  password: string;
};
