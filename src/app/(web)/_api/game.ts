import axios, { AxiosError } from 'axios';

import { GameStatus } from '@/app/_utils/types';

export const getGameStatus = async () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await axios.get(`${API_URL}/game/status`);
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
      };
    }
    return {
      success: true,
      message: 'Game status fetched successfully',
      gameStatus: 1,
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
