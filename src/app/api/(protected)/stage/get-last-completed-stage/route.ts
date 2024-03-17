import { NextRequest, NextResponse } from 'next/server';

import TeamModel from '@/app/_model/team.model';
import { StatusCode } from '@/app/_utils/types';

export async function GET(req: NextRequest) {
  try {
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
    const team = await TeamModel.findOne({ teamId });
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

    return NextResponse.json(
      {
        lastCompletedStage: team.lastCompletedStage,
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
