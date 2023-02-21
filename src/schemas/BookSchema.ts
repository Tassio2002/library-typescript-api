import { z } from "zod";

export const BookSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, "The title is required")
      .max(100, "The character limit is 55"),
    quantity: z.number().nonnegative(),
    image_url: z
      .string()
      .url()
  }),
});
