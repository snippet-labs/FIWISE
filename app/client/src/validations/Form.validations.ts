import { z } from "zod";

export const studentFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 chars" })
    .max(100, { message: "Name must not exceed 100 chars" })
    .trim(),

  level: z
    .string()
    .min(1, { message: "Class is required" })
    .trim()
    .refine(
      (val) => {
        const num = Number(val);
        if (!Number.isNaN(num)) return num >= 1 && num <= 12;
        return ["ug", "pg"].includes(val.toLowerCase());
      },
      { message: "Enter class 1–12 or 'ug'/'pg'" },
    ),

  year: z
    .number({ message: "Must have a year" })
    .int({ message: "Year must be a whole number" })
    .min(2000, { message: "Year must be 2000 or later" })
    .max(2100, { message: "Year must be 2100 or earlier" }),

  joined: z
    .number({ message: "Month is required" })
    .int({ message: "Month must be a whole number" })
    .min(1, { message: "Month must be at least 1" })
    .max(12, { message: "Month must not exceed 12" }),

  subjects: z
    .array(z.string())
    .default([])
    .pipe(
      z
        .array(z.string())
        .min(1, { message: "At least one subject must be selected" })
        .max(20, { message: "Maximum 20 subjects allowed" }),
    ),

  days: z
    .array(z.string())
    .default([])
    .pipe(
      z
        .array(z.string())
        .min(1, { message: "At least one day must be selected" })
        .max(7, { message: "Maximum 7 days allowed" }),
    ),

  fees: z
    .number({ message: "Fees must be a number" })
    .min(0, { message: "Fees cannot be negative" })
    .max(1000000, { message: "Fees must not exceed 1,000,000" }),

  feeTracking: z.record(z.number(), z.array(z.string())).default({}),
});

export type StudentFormData = z.infer<typeof studentFormSchema>;
