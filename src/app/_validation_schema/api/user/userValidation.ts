import { z } from 'zod';

export const CreateTeamSchema = z.object({
  teamName: z.string().min(3).max(50),

  // details of team creator
  members: z.array(
    z.object({
      name: z.string().min(3).max(50),
    })
  ),
});
export const MemberSchema = z.object({
  name: z.string().min(3).max(50),
});
export const LoginSchema = z.object({
  teamId: z.string().min(6).max(6),
});
export type TeamProps = z.infer<typeof CreateTeamSchema>;
