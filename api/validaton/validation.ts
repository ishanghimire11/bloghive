import * as z from "zod";

export const createUserSchema = z.object({
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

export type UserSchema = z.infer<typeof createUserSchema>;
