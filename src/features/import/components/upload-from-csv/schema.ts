import z from "zod";

export const uploadSchema = z.object({
  secretWord: z.string().min(1, "Secret word is required"),
});

export type UploadFormValues = z.infer<typeof uploadSchema>;
