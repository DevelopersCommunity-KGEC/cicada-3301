import { NextRequest, NextResponse } from 'next/server';

import databaseConnect from '@/app/api/database';

export async function GET(req: NextRequest) {
  try {
    await databaseConnect();
    const cookies = req.cookies;
    const payload = cookies.get('decoded-user');
    if (!payload) {
      return NextResponse.json({
        message: 'Unauthorized',
      });
    }
    const user = JSON.parse(payload.value);
    return NextResponse.json({
      message: 'Welcome to instructions',
      user,
    });
  } catch (error) {
    return NextResponse.json({
      message: 'An error occurred while processing your request.',
      description: JSON.stringify(error),
    });
  }
}
