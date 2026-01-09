'use server';

import db from '@/lib/db';
import { slugify } from '@/lib/utils';

export async function getFeaturedBlogs() {
  const blogs = await db.blog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 3,
  });
  return blogs;
}

export async function getAllBlogs(query = '', category = '') {
  const where: any = {};

  if (query) {
    where.OR = [
      { title: { contains: query, mode: 'insensitive' } },
      { excerpt: { contains: query, mode: 'insensitive' } },
    ];
  }

  if (category) {
    where.category = category;
  }

  const blogs = await db.blog.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  return blogs;
}

export async function getBlogBySlug(slug: string) {
  const blog = await db.blog.findUnique({
    where: { slug },
  });
  return blog;
}

export async function getBlogById(id: string) {
  const blog = await db.blog.findUnique({
    where: { id },
  });
  return blog;
}

export async function createBlog(blogData: {
  title: string;
  excerpt: string;
  category: string;
  thumbnailUrl: string;
  content: string;
}) {
  const slug = slugify(blogData.title);
  // Note: Handle slug uniqueness in real app (suffix if exists)

  const blog = await db.blog.create({
    data: {
      ...blogData,
      slug,
    },
  });

  return blog;
}

export async function updateBlog(
  id: string,
  blogData: {
    title: string;
    excerpt: string;
    category: string;
    thumbnailUrl: string;
    content: string;
  },
) {
  const slug = slugify(blogData.title);

  const updatedBlog = await db.blog.update({
    where: { id },
    data: {
      ...blogData,
      slug,
    },
  });

  return updatedBlog;
}

export async function deleteBlog(id: string) {
  await db.blog.delete({
    where: { id },
  });
  return { success: true };
}

export async function getUserStats() {
  // Get total posts
  const totalPosts = await db.blog.count();

  // Get posts created this month
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const postsThisMonth = await db.blog.count({
    where: {
      createdAt: { gte: startOfMonth },
    },
  });

  // Get total views (mock data)
  const totalViews = Math.floor(Math.random() * 10000);
  const viewsThisMonth = Math.floor(Math.random() * 2000);

  // Get categories count
  // Prisma groupBy requires knowing fields upfront, simple group by:
  const categoriesResult = await db.blog.groupBy({
    by: ['category'],
    _count: {
      category: true,
    },
    orderBy: {
      _count: {
        category: 'desc',
      },
    },
  });

  const categories = categoriesResult.length;

  // Get popular categories
  const popularCategories = categoriesResult.slice(0, 5).map((cat) => ({
    name: cat.category || 'Uncategorized',
    count: cat._count.category,
  }));

  // Get average read time (mock data)
  const avgReadTime = Math.floor(Math.random() * 8) + 3;

  // Get recent posts
  const recentPosts = await db.blog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  return {
    totalPosts,
    postsThisMonth,
    totalViews,
    viewsThisMonth,
    categories,
    popularCategories,
    avgReadTime,
    recentPosts,
  };
}
