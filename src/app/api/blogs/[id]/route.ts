import { type NextRequest, NextResponse } from 'next/server';
import { getBlogById, updateBlog, deleteBlog } from '@/lib/blog-service';

export async function GET(
  request: NextRequest,

  { params }: { params: any },
) {
  const { id } = await params;
  try {
    const blog = await getBlogById(id);

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog' },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,

  { params }: { params: any },
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const updatedBlog = await updateBlog(id, body);

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { error: 'Failed to update blog' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,

  { params }: { params: any },
) {
  const { id } = await params;
  try {
    await deleteBlog(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 },
    );
  }
}
