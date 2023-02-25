import { z } from "zod";

export const LoginSchema = z.object({
  body: z.object({
    email: z.string().email().min(1, "The email is required"),
    password: z
      .string()
      .min(6, "The password must have at least 6 characters")
      .max(30, "The character limit is 30"),
  }),
});
