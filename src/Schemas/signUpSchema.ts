import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(3, "Username must at least 3 characters")
  .max(30, "Username must at least 30 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special character");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});
