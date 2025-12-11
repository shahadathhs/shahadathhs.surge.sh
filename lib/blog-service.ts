'use server';

import { Blog } from '@/lib/models';
import { serialize, slugify } from '@/lib/utils';
import dbConnect from './dbConnect';

export async function getFeaturedBlogs() {
  await dbConnect();

  // Get the 3 most recent blogs
  const blogs = await Blog.find().sort({ createdAt: -1 }).limit(3).lean();

  return blogs;
}

export async function getAllBlogs(query = '', category = '') {
  await dbConnect();

  const filter: Record<string, unknown> = {};

  if (query) {
    filter.$or = [
      { title: { $regex: query, $options: 'i' } },
      { excerpt: { $regex: query, $options: 'i' } },
    ];
  }

  if (category) {
    filter.category = category;
  }

  const blogs = await Blog.find(filter).sort({ createdAt: -1 }).lean();

  return blogs;
}

export async function getBlogBySlug(slug: string) {
  await dbConnect();

  const blog = await Blog.findOne({ slug });

  if (!blog) return null;

  return blog?.toObject();
}

export async function getBlogById(id: string) {
  await dbConnect();

  const blog = await Blog.findById(id);

  return serialize(blog);
}

export async function createBlog(blogData: {
  title: string;
  excerpt: string;
  category: string;
  thumbnailUrl: string;
  content: string;
}) {
  await dbConnect();

  const slug = slugify(blogData.title);

  const blog = new Blog({
    ...blogData,
    slug,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const result = await blog.save();

  return serialize(result);
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
  await dbConnect();

  const slug = slugify(blogData.title);

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    {
      ...blogData,
      slug,
      updatedAt: new Date(),
    },
    { new: true },
  );

  return serialize(updatedBlog);
}

export async function deleteBlog(id: string) {
  await dbConnect();

  await Blog.findByIdAndDelete(id);

  return { success: true };
}

export async function getUserStats() {
  await dbConnect();

  // Get total posts
  const totalPosts = await Blog.countDocuments();

  // Get posts created this month
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const postsThisMonth = await Blog.countDocuments({
    createdAt: { $gte: startOfMonth },
  });

  // Get total views (mock data for demo)
  const totalViews = Math.floor(Math.random() * 10000);
  const viewsThisMonth = Math.floor(Math.random() * 2000);

  // Get categories count
  const categoriesResult = await Blog.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  const categories = categoriesResult.length;

  // Get popular categories
  const popularCategories = categoriesResult.slice(0, 5).map((cat) => ({
    name: cat._id,
    count: cat.count,
  }));

  // Get average read time (mock data for demo)
  const avgReadTime = Math.floor(Math.random() * 8) + 3;

  // Get recent posts
  const recentPosts = await Blog.find().sort({ createdAt: -1 }).limit(5).lean();

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
