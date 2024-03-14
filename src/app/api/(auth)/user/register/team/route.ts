import { NextRequest, NextResponse } from 'next/server';

import databaseConnect from '@/app/api/database';

export async function POST(req: NextRequest) {
  try {
    await databaseConnect();
    const body = await req.json();
    console.log(body);
    return NextResponse.json({
      message: 'Welcome to Cicada 3301 teams',
      description: 'this is teams registration page.',
      request: body,
    });
  } catch (error) {
    return NextResponse.json({
      message: 'An error occurred while processing your request.',
      description: JSON.stringify(error),
    });
  }
}
