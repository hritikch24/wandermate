import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  age: z.number().min(18, 'Must be at least 18').max(100).optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const tripSchema = z.object({
  destination: z.string().min(1, 'Destination is required'),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  sponsorType: z.enum(['sponsor', 'need-sponsor', 'just-join']),
  budget: z.string().optional(),
  groupSize: z.string().default('2-4'),
  accommodation: z.string().default('flexible'),
  interests: z.array(z.string()).default([]),
});

export const profileSchema = z.object({
  name: z.string().min(2).optional(),
  bio: z.string().max(500).optional(),
  age: z.number().min(18).max(100).optional(),
  phone: z.string().optional(),
  travelStyle: z.string().optional(),
  languages: z.array(z.string()).optional(),
  interests: z.array(z.string()).optional(),
});

export const guideSchema = z.object({
  speciality: z.string().min(3, 'Speciality is required'),
  city: z.string().min(1, 'City is required'),
  pricePerDay: z.number().min(100, 'Minimum price is ₹100'),
  expertise: z.array(z.string()).min(1, 'At least one expertise required'),
  localSince: z.string().min(1),
  availability: z.string().default('Available now'),
});

export const messageSchema = z.object({
  receiverId: z.string().min(1),
  content: z.string().min(1, 'Message cannot be empty').max(2000),
});

export const reviewSchema = z.object({
  targetId: z.string().min(1),
  rating: z.number().min(1).max(5),
  comment: z.string().min(5, 'Review must be at least 5 characters'),
  tripCity: z.string().optional(),
});

export const bookingSchema = z.object({
  guideId: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  notes: z.string().optional(),
});
