import { type NextRequest, NextResponse } from 'next/server';
import { createBlog } from '@/lib/blog-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newBlog = await createBlog(body);

    return NextResponse.json(newBlog);
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 },
    );
  }
}
