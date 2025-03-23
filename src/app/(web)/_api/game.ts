import axios, { AxiosError } from 'axios';

import { GameStatus, ResponseToken, StatusCode } from '@/app/_utils/types';

export const getGameStatus = async () => {
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
    const response = await axios.get(`${API_URL}/game/status`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
    if (response.status !== 200) {
      return {
        success: false,
        message: 'Failed to get game status',
        gameStatus: -1,
      };
    }
    if (response.data.gameStatus === GameStatus.STARTED) {
      return {
        success: true,
        message: 'Game started',
        gameStatus: GameStatus.STARTED,
        nextStage: response.data.stage,
      };
    }
    return {
      success: true,
      message: 'Game status fetched successfully',
      gameStatus: 1,
      nextStage: response.data.stage,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response && error.response.data) {
        if (error.response.data.gameStatus === GameStatus.NOT_STARTED) {
          return {
            success: false,
            message: 'Game not started yet',
            gameStatus: GameStatus.NOT_STARTED,
          };
        } else if (error.response.data.gameStatus === GameStatus.ENDED) {
          return {
            success: false,
            message: 'Game ended',
            gameStatus: GameStatus.ENDED,
          };
        }
      }
    }
    return {
      success: false,
      message: 'Something went wrong',
      gameStatus: -1,
    };
  }
};
