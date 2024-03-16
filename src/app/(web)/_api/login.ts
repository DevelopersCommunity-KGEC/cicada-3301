import axios from 'axios';

import { LoginSchema } from '@/app/_validation_schema/api/user/userValidation';

export const handleLogin = async (teamId: string, espektroId: string) => {
  const { success } = LoginSchema.safeParse({
    teamId,
    espektroId,
  });
  if (!success) {
    return {
      success: false,
      message: 'Invalid input',
    };
  }
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await axios.post(`${API_URL}/user/login`, {
      teamId,
      espektroId,
    });
    sessionStorage.setItem('authToken', response.data.authToken);
    if (response.status !== 200) {
      return {
        success: false,
        message: 'Login failed',
      };
    }
    return {
      success: true,
      message: 'Login successful',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong',
    };
  }
};
