import { NextResponse } from 'next/server';

import GameModel from '@/app/_model/game.model';
import { GameStatus, StatusCode } from '@/app/_utils/types';

export async function GET() {
  try {
    const games = await GameModel.find({});
    const game = games[0];
    if (!game) {
      return NextResponse.json(
        {
          message: 'game not found',
        },
        {
          status: StatusCode.NOT_FOUND,
          statusText: 'not found',
        }
      );
    }

    if (game.gameStartTime > new Date()) {
      return NextResponse.json(
        {
          message: 'game not started yet',
          gameStatus: GameStatus.NOT_STARTED,
        },
        {
          status: StatusCode.BAD_REQUEST,
          statusText: 'bad request',
        }
      );
    } else if (game.gameEndTime < new Date()) {
      return NextResponse.json(
        {
          message: 'game ended',
          gameStatus: GameStatus.ENDED,
        },
        {
          status: StatusCode.BAD_REQUEST,
          statusText: 'bad request',
        }
      );
    } else {
      return NextResponse.json({
        message: 'Game Started',
        gameStatus: GameStatus.STARTED,
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while processing your request.',
        description: JSON.stringify(error),
      },
      {
        status: StatusCode.INTERNAL_SERVER_ERROR,
        statusText: 'server error',
      }
    );
  }
}
