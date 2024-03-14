import { NextRequest, NextResponse } from 'next/server';

import QuestionModel from '@/app/_model/question.model';
import { StatusCode } from '@/app/_utils/types';
import databaseConnect from '@/app/api/database';

export async function POST(req: NextRequest) {
  try {
    await databaseConnect();
    const question = new QuestionModel({
      totalPoints: 0,
    });
    const createdQuestion = await question.save();

    return NextResponse.json(
      {
        message: 'stage created successfully',
        questionId: createdQuestion._id,
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
