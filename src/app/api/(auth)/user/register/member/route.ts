import { NextResponse } from 'next/server';

import databaseConnect from '@/app/api/database';

export async function GET() {
  try {
    await databaseConnect();
    return NextResponse.json({
      message: 'Welcome to Cicada 3301 members',
      description: 'this is members registration page.',
    });
  } catch (error) {
    return NextResponse.json({
      message: 'An error occurred while processing your request.',
      description: JSON.stringify(error),
    });
  }
}
