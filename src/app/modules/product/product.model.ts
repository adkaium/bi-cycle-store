import { Schema, model } from 'mongoose';
import { ProductDetali } from './product.interface';

const productSchema = new Schema<ProductDetali>({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// use middleware hook find for search product by name,brand,type

productSchema.pre('find', function (next) {
  const query: any = this.getQuery();
  if (query.searchTerm) {
    const searchRegex = new RegExp(query.searchTerm, 'i');
    this.find({
      $or: [
        { name: searchRegex },
        { brand: searchRegex },
        { type: searchRegex },
      ],
      isDeleted: false,
    });
    delete query.searchTerm; // Clean up the query object
  }
  next();
});

productSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } }, { new: true });
  next();
});

// create a  model of product

export const ProductModel = model<ProductDetali>('Product', productSchema);
