import { NextRequest, NextResponse } from 'next/server';

import GameModel from '@/app/_model/game.model';
import { StatusCode } from '@/app/_utils/types';
import databaseConnect from '@/app/api/database';

export async function POST(req: NextRequest) {
  try {
    await databaseConnect();
    const body = await req.json();
    const game = new GameModel({
      totalPoints: 0,
      gameStartTime: body.startTime ?? new Date(),
      gameEndTime: body.endTime ?? new Date(),
    });
    const createdGame = await game.save();

    return NextResponse.json(
      {
        message: 'stage created successfully',
        questionId: createdGame._id,
      },
      {
        status: StatusCode.CREATED,
        statusText: 'created',
      }
    );
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
