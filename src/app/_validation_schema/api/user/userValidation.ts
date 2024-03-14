import { z } from 'zod';

export const CreateTeamSchema = z.object({
  teamName: z.string().min(3).max(50),
  noOfMembers: z.number().int().positive().min(1).max(3),

  // details of team creator
  name: z.string().min(3).max(50),
  espektroId: z.string().min(5),
  college: z.string().min(3).max(50),
});
export const MemberSchema = z.object({
  name: z.string().min(3).max(50),
  espektroId: z.string().min(5),
  college: z.string().min(3).max(50),
});
export type TeamProps = z.infer<typeof CreateTeamSchema>;
