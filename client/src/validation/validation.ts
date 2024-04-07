import * as z from "zod";

// ------------ SIGN UP --------------- //

export const registerUserSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Enter a valid email"),
});

export type RegisterUserSchema = z.infer<typeof registerUserSchema>;

export type ValidRegisterFieldNames = "username" | "password" | "email";

// ------------ SIGN IN --------------- //

export const loginUserSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Enter a valid email"),
});

export type LoginUserSchema = z.infer<typeof loginUserSchema>;

export type ValidLoginFieldNames = "password" | "email";
