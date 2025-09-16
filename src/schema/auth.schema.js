import { z } from "zod";

export const usernameValidationSchema = z.string().min(2).max(20);
export const passwordValidationSchema = z.string().min(6).max(50);

export const userRegisterSchema = z.object({
  username: usernameValidationSchema,
  email: z.email(),
  password: passwordValidationSchema,
});

export const userLoginSchema = z.object({
  username: usernameValidationSchema,
  email: z.email().optional(),
  password: passwordValidationSchema,
});
