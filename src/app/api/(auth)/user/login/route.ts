import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

import TeamModel from '@/app/_model/team.model';
import { StatusCode } from '@/app/_utils/types';
import databaseConnect from '@/app/api/database';

export async function POST(req: NextRequest) {
  try {
    await databaseConnect();
    const body = await req.json();
    const team = await TeamModel.findOne({
      teamId: body.teamId,
   });
    if (!team) {
      return NextResponse.json(
        {
          message: 'team not found',
        },
        {
          status: StatusCode.NOT_FOUND,
          statusText: 'team not found',
        }
      );
    }

    const token = jwt.sign(
      {
        teamId: team.teamId,
      },
      `${process.env.SECRET_KEY}`,
      {
        expiresIn: '5d',
      }
    );

    return NextResponse.json(
      {
        message: 'login successful',
        authToken: token,
      },
      {
        status: StatusCode.OK,
        statusText: 'login successful',
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
