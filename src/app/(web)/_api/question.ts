import axios, { AxiosError } from 'axios';

import { ResponseToken, StatusCode } from '@/app/_utils/types';

export const getQuestionById = async (
  stageId: number
): Promise<{
  success: boolean;
  message: string;
  status: number;
  data: unknown;
}> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const authToken = sessionStorage.getItem(ResponseToken.AUTH_TOKEN);
  if (!authToken) {
    return {
      success: false,
      message: 'unauthorized access',
      status: StatusCode.UNAUTHORIZED,
      data: null,
    };
  }
  try {
    const response = await axios.get(
      `${API_URL}/stage/get-question/${stageId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    if (response.status !== 200) {
      return {
        success: false,
        message: 'Login failed',
        status: response.status,
        data: null,
      };
    }
    return {
      success: true,
      message: 'Login successful',
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        return {
          success: false,
          message: 'unauthorized access',
          status: StatusCode.UNAUTHORIZED,
          data: null,
        };
      }
    }
    return {
      success: false,
      message: 'Something went wrong',
      status: StatusCode.INTERNAL_SERVER_ERROR,
      data: null,
    };
  }
};
