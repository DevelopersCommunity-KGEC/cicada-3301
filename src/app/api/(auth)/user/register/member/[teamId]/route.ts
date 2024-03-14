import { NextRequest, NextResponse } from 'next/server';

import TeamModel from '@/app/_model/team.model';
import { StatusCode } from '@/app/_utils/types';
import { MemberSchema } from '@/app/_validation_schema/api/user/userValidation';
import databaseConnect from '@/app/api/database';

export async function POST(
  req: NextRequest,
  { params }: { params: { teamId: string } }
) {
  try {
    await databaseConnect();
    const body = await req.json();
    const { success } = MemberSchema.safeParse(body);
    const teamId = params.teamId;
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
    const team = await TeamModel.findOne({ teamId });
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
    if (team.members?.length === team.noOfMembers) {
      return NextResponse.json(
        {
          message: 'team is full',
        },
        {
          status: StatusCode.BAD_REQUEST,
          statusText: 'team is full',
        }
      );
    }

    team.members?.push(body);
    await team.save();

    return NextResponse.json(
      {
        message: 'member added successfully.',
      },
      {
        status: StatusCode.CREATED,
        statusText: 'member added',
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
