import { NextRequest, NextResponse } from 'next/server';

import StageModel from '@/app/_model/stage.model';
import TeamModel from '@/app/_model/team.model';
import { StatusCode } from '@/app/_utils/types';
import { CheckAnswerSchema } from '@/app/_validation_schema/api/stage/stageValidation';
import databaseConnect from '@/app/api/database';

export async function POST(req: NextRequest) {
  try {
    await databaseConnect();
    const body = await req.json();
    const { success } = CheckAnswerSchema.safeParse(body);
    if (!success) {
      return NextResponse.json(
        {
          message: 'Invalid input',
          description: 'Invalid input',
        },
        {
          status: StatusCode.BAD_REQUEST,
          statusText: 'bad request',
        }
      );
    }
    const stage = await StageModel.findById(body.id);
    if (!stage) {
      return NextResponse.json(
        {
          message: 'stage not found',
        },
        {
          status: StatusCode.NOT_FOUND,
          statusText: 'not found',
        }
      );
    }
    /**
    checking if the answer is correct
    */
    const providedAnswer =
      typeof body.answer === 'string' ? body.answer.toLowerCase() : body.answer;
    const correctAnswer =
      typeof stage.answer === 'string'
        ? stage.answer.toLowerCase()
        : stage.answer;
    if (providedAnswer !== correctAnswer) {
      return NextResponse.json(
        {
          message: 'Incorrect answer',
          success: false,
        },
        {
          status: StatusCode.BAD_REQUEST,
          statusText: 'bad request',
        }
      );
    }
    const payload = req.headers.get('Set-user');
    if (!payload) {
      return NextResponse.json(
        {
          message: 'Unauthorized',
        },
        {
          status: StatusCode.UNAUTHORIZED,
          statusText: 'unauthorized',
        }
      );
    }
    const parsedPayload = JSON.parse(payload);
    const teamId = parsedPayload.payload.teamId;

    const team = await TeamModel.findOneAndUpdate(
      {
        teamId,
      },
      {
        $inc: {
          totalPointScored: stage.points,
          noOfStagesAttempted: 1,
        },
        $addToSet: {
          stages: {
            timeStamp: new Date(),
            stageId: stage._id,
          },
        },
      }
    );
    if (!team) {
      return NextResponse.json(
        {
          message: 'Team not found',
        },
        {
          status: StatusCode.NOT_FOUND,
          statusText: 'not found',
        }
      );
    }
    await team.save();

    const nextStage = await StageModel.findOne({
      stageId: stage.stageId + 1,
    });

    if (!nextStage) {
      return NextResponse.json(
        {
          message: 'Correct answer',
          description: 'Points added to your team',
          success: true,
          nextStageId: -1,
          nextStage: null,
        },
        {
          status: StatusCode.OK,
          statusText: 'ok',
        }
      );
    }

    return NextResponse.json(
      {
        message: 'Correct answer',
        description: 'Points added to your team',
        success: true,
        nextStageId: nextStage.stageId,
        nextStage: nextStage._id,
      },
      {
        status: StatusCode.OK,
        statusText: 'ok',
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
