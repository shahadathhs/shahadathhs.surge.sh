'use server';

import configuration from '@/config/configuration';
import { User } from '@/lib/models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from './dbConnect';

export async function registerUser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  await dbConnect();

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  await user.save();

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
  };
}

export async function login(email: string, password: string) {
  await dbConnect();

  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, configuration?.jwtSecret as string, {
    expiresIn: '7d',
  });

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    token,
  };
}

export async function logout() {
  // In a client-side auth system, we just need to remove the token
  // This is handled in the auth context by removing from localStorage
  return true;
}

export async function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, configuration?.jwtSecret as string) as {
      id: string;
    };
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    throw new Error('Invalid token');
  }
}
