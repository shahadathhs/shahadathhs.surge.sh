import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const response = NextResponse.json({ message: 'Logged out successfully' });

  response.cookies.delete('token');

  return response;
}
