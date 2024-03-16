import axios from 'axios';

import { ResponseToken } from '@/app/_utils/types';
import { CreateTeamSchema } from '@/app/_validation_schema/api/user/userValidation';

export const handleRegisterTeam = async (
  teamName: string,
  members: { name: string; espektroId: string }[]
) => {
  const { success } = CreateTeamSchema.safeParse({
    teamName,
    members,
  });
  if (!success) {
    return {
      success: false,
      message: 'Invalid input',
    };
  }
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await axios.post(`${API_URL}/user/register/team`, {
      teamName,
      members,
    });
    if (response.status !== 201) {
      return {
        success: false,
        message: 'Registration failed',
      };
    }

    sessionStorage.setItem(ResponseToken.TEAM_ID, response.data.teamId);

    return {
      success: true,
      message: 'Team Registration successful',
      teamId: response.data.teamId,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong',
    };
  }
};
