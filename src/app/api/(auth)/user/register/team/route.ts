import { NextRequest, NextResponse } from 'next/server';

import TeamModel from '@/app/_model/team.model';
import { StatusCode } from '@/app/_utils/types';
import { CreateTeamSchema } from '@/app/_validation_schema/api/user/userValidation';
import databaseConnect from '@/app/api/database';

export async function POST(req: NextRequest) {
  try {
    await databaseConnect();
    const body = await req.json();
    const { success } = CreateTeamSchema.safeParse(body);
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
    const team = new TeamModel(body);
    await team.save();

    return NextResponse.json(
      {
        message: 'team registered successfully',
      },
      {
        status: StatusCode.CREATED,
        statusText: 'registered',
      }
    );
  } catch (error) {
    return NextResponse.json({
      message: 'An error occurred while processing your request.',
      description: JSON.stringify(error),
    });
  }
}
