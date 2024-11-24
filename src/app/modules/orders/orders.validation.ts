import { z } from 'zod';

// Zod Schema for Order
export const OrderValidationSchema = z.object({
  email: z.string().email('Invalid email address'), // Validates a required email field
  product: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId format'), // Validates a MongoDB ObjectId
  quantity: z.number().min(1, { message: "'Quantity must be at least 1'" }), // Validates a positive integer for quantity
  totalPrice: z.number().min(0, 'Total price must be a non-negative number'), // Validates non-negative totalPrice
});
