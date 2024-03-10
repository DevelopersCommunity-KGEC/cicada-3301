import { NextResponse } from 'next/server';
import databaseConnect from '../database';

export async function GET() {
  try {
    await databaseConnect();
    return NextResponse.json({
      message: 'Welcome to Cicada 3301',
      description:
        'Cicada database connected -> MongoDB Connected: cicada-3301',
    });
  } catch (error) {
    return NextResponse.json({
      message: 'An error occurred while processing your request.',
      description: JSON.stringify(error),
    });
  }
}
