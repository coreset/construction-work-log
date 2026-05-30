import { z } from "zod";

const todayEnd = () => {
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d;
};

export const CreateWorkEntrySchema = z.object({
  date: z
    .string({ required_error: "Date is required" })
    .refine((d) => new Date(d) <= todayEnd(), "Date cannot be in the future"),
  workType: z
    .string({ required_error: "Work type is required" })
    .min(2, "Work type must be at least 2 characters"),
  volume: z
    .number({ required_error: "Volume is required" })
    .positive("Volume must be a positive number"),
  unit: z.string({ required_error: "Unit is required" }).min(1, "Unit is required"),
  performer: z
    .string({ required_error: "Performer is required" })
    .min(3, "Performer must be at least 3 characters"),
});

export const UpdateWorkEntrySchema = CreateWorkEntrySchema;

export type CreateWorkEntryDto = z.infer<typeof CreateWorkEntrySchema>;
