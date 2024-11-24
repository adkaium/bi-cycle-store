import { z } from 'zod';

// Zod Schema for Product
export const ProductValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'), // Validates required and non-empty string
  brand: z.string().min(1, 'Brand is required'),
  price: z.number().min(0, 'Price must be a non-negative number'), // Validates positive price
  type: z.enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric']), // Matches the enum in Mongoose
  description: z.string().min(1, 'Description is required'),
  quantity: z.number().min(0, 'Quantity must be a non-negative number'), // Validates non-negative integer
  inStock: z.boolean().default(true), // Default value set to true
  isDeleted: z.boolean().default(false), // Default value set to false
});
