import { z } from "zod";

export const UserSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, "The name must have at least 2 characters")
      .max(55, "The character limit is 55"),
    email: z.string().email(),
    password: z
      .string()
      .min(6, "The password must have at least 6 characters")
      .max(30, "The character limit is 55"),
  }),
});
