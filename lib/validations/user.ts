import { z } from "zod";

export const userFormSchema = z.object({
  name: z.string().min(3, { message: "Nama minimal harus terdiri dari 3 karakter." }),
  email: z.string().email({ message: "Format email tidak valid." }),
  role: z.enum(["USER", "ADMIN"], { message: "Role harus USER atau ADMIN." }),
});

export type UserFormValues = z.infer<typeof userFormSchema>;