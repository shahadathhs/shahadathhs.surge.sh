import mongoose, { Document } from 'mongoose';

// User Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export type Blog = {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  thumbnailUrl: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface BlogDocument extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  thumbnailUrl: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

// Blog Schema
const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

// Export models
export const User =
  mongoose?.models?.User || mongoose.model('User', UserSchema);
export const Blog =
  mongoose?.models?.Blog || mongoose.model('Blog', BlogSchema);
