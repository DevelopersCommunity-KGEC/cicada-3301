import * as jose from 'jose';
import { NextRequest, NextResponse } from 'next/server';

import { StatusCode } from './app/_utils/types';

const secret = new TextEncoder().encode(`${process.env.SECRET_KEY}`);

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const header = request.headers.get('Authorization');
  const authToken = header?.split(' ')[1];
  if (!authToken) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: StatusCode.UNAUTHORIZED, statusText: 'Unauthorized' }
    );
  }

  const payload = await jose.jwtVerify(authToken, secret);

  if (!payload) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: StatusCode.UNAUTHORIZED, statusText: 'Unauthorized' }
    );
  }
  response.headers.set('Set-user', JSON.stringify(payload));

  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/api/instructions', '/api/question', '/api/stage/(.*)'],
};
