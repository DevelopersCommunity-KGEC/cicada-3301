import { NextRequest, NextResponse } from 'next/server';

import GameModel from '@/app/_model/game.model';
import StageModel from '@/app/_model/stage.model';
import { StatusCode } from '@/app/_utils/types';
import { CreateStageSchema } from '@/app/_validation_schema/api/stage/stageValidation';
import databaseConnect from '@/app/api/database';

export async function POST(req: NextRequest) {
  try {
    await databaseConnect();
    const body = await req.json();
    const { success } = CreateStageSchema.safeParse(body);
    if (!success) {
      return NextResponse.json(
        {
          message: 'invalid data',
        },
        {
          status: StatusCode.BAD_REQUEST,
          statusText: 'invalid data',
        }
      );
    }
    const { gameId, ...stageData } = body;
    const stage = new StageModel(stageData);
    const createdStage = await stage.save();

    const game = await GameModel.findById(gameId);
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

    game.stages.push(createdStage._id);
    game.totalPoints += createdStage.points;
    await game.save();

    return NextResponse.json(
      {
        message: 'stage created successfully',
        stageId: createdStage._id,
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
