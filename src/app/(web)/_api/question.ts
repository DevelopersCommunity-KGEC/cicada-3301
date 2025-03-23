import axios, { AxiosError } from 'axios';

import { ResponseToken, StatusCode } from '@/app/_utils/types';

type SubmitAnswerResponseDataProps =
  | {
      message: string;
      description: string;
      totalTokens: number;
      success: boolean;
      nextStageId: number;
      nextStage: string;
      game: boolean;
    }
  | {
      message: string;
      success: boolean;
      totalTokens: number;
      game: boolean;
    };

export const getQuestionById = async (
  stageId: string
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

export async function submitAnswer(
  answer: string,
  id: string
): Promise<{
  success: boolean;
  message: string;
  data: SubmitAnswerResponseDataProps | null;
  status: number;
}> {
  try {
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
    const response = await axios.post(
      `${API_URL}/stage/check-answer/`,
      {
        answer,
        id,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (response.status !== 200) {
      return {
        success: false,
        message: 'submit answer failed',
        status: response.status,
        data: null,
      };
    }

    return {
      success: true,
      message: 'Correct answer !',
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === StatusCode.UNAUTHORIZED) {
        return {
          success: false,
          message: 'unauthorized access',
          status: StatusCode.UNAUTHORIZED,
          data: null,
        };
      } else if (error.response?.status === StatusCode.BAD_REQUEST) {
        if (
          'totalTokens' in error.response.data ||
          'game' in error.response.data
        ) {
          return {
            success: false,
            message: 'Wrong answer !',
            data: error.response.data,
            status: StatusCode.BAD_REQUEST,
          };
        }
        return {
          success: false,
          message: 'bad request',
          status: StatusCode.BAD_REQUEST,
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
}
