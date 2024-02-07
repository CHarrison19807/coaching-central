import { z } from "zod";

export const TankQueryValidator = z.object({
  type: z.string().optional(),
  nation: z.string().optional(),
  sort: z.enum(["asc", "desc"]).optional(),
  limit: z.number().optional(),
});

export const ReplayQueryValidator = z.object({
  sort: z.enum(["asc", "desc"]).optional(),
  limit: z.number().optional(),
});

export const CoachQueryValidator = z.object({
  sort: z.enum(["asc", "desc"]).optional(),
  limit: z.number().optional(),
});

export type TCoachQueryValidator = z.infer<typeof CoachQueryValidator>;
export type TReplayQueryValidator = z.infer<typeof ReplayQueryValidator>;
export type TTankQueryValidator = z.infer<typeof TankQueryValidator>;
