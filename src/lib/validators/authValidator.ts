import { z } from "zod";

export const signUpCredentials = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(32, { message: "Password must be at most 32 characters long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export const signInCredentials = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type TSignInCredentials = z.infer<typeof signInCredentials>;
export type TSignUpCredentials = z.infer<typeof signUpCredentials>;
