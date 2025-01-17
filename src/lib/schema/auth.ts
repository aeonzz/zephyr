import * as z from "zod";

const createUserSchemaBase = z.object({
  email: z
    .string({ required_error: "Email is Required" })
    .min(1, { message: "Email is required" })
    .email(),
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Cannot exceed 50 characters" }),
  password: z
    .string()
    .min(4, { message: "Must be at least 4 characters long" })
    .max(15, { message: "Cannot be more than 15 characters long" }),
  confirmPassword: z
    .string()
    .min(1, { message: "Password confirmation is required" }),
});

export const createUserSchema = createUserSchemaBase.refine(
  (data) => data.password === data.confirmPassword,
  {
    path: ["confirmPassword"],
    message: "Password do not match",
  }
);

export const forgotPasswordSchema = z.object({
  email: z.string({ required_error: "Email is required" }).min(1).email(),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(4, { message: "Must be at least 4 characters long" })
      .max(15, { message: "Cannot be more than 15 characters long" }),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

export const loginSchema = z.object({
  email: z.string({ required_error: "Email is required" }).min(1).email(),
  password: z
    .string()
    .min(4, { message: "Must be at least 4 characters long" })
    .max(15, { message: "Cannot be more than 15 characters long" }),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
