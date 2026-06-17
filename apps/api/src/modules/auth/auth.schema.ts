import { z } from "zod";

const userRegistration = z.object({
  email: z.email().lowercase().trim(),
  first_name: z.string().min(1).max(30).trim(),
  last_name: z.string().min(1).max(30).trim(),
  password: z.string().min(8).max(72),
  tenant_name: z.string().min(1),
});

const userLogin = z.object({
  email: z.email().lowercase().trim(),
  password: z.string().min(1),
});

export type RegisterInput = z.infer<typeof userRegistration>;
export type LoginInput = z.infer<typeof userLogin>;
