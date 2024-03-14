import { z } from 'zod';

export const CreateTeamSchema = z.object({
  teamName: z.string().min(3).max(50),
  teamLeader: z.string().min(3).max(50),
  teamLeaderEspektroId: z.string().min(5),
  noOfMembers: z.number().int().positive().min(1).max(3),
  college: z.string().min(3).max(50),
});

export type TeamProps = z.infer<typeof CreateTeamSchema>;
