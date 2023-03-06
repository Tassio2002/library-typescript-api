import { z } from "zod";

export const SearchSchema = z.object({
  body: z.object({
    title_search: z
      .string()
      .min(2, "The search must have at least 2 characters"),
  }),
});
