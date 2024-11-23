// Creatr a new order

import { ProductModel } from '../product/product.model';
import OrderModel from './order.model';

const createOrder = async (orderData: any) => {
  const { product, quantity } = orderData;

  //get product details
  const bicycle = await ProductModel.findById(product);
  if (!bicycle || bicycle.isDeleted) {
    throw new Error('Bicycle not found');
  }

  // stock availability
  if (bicycle.quantity < quantity) {
    throw new Error('Insufficient  quantity');
  }

  // Update product inventory
  bicycle.quantity -= quantity;
  if (bicycle.quantity === 0) {
    bicycle.inStock = false;
  }
  await bicycle.save();

  // create the order
  const totalPrice = quantity * bicycle.price;
  const newOrder = new OrderModel({ ...orderData, totalPrice });
  return await newOrder.save();
};

// calculate total revenue

const calculteTotalRevenue = async () => {
  const revenue = await OrderModel.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ]);

  return revenue[0]?.totalRevenue || 0;
};

export const orderservirce = {
  createOrder,
  calculteTotalRevenue
};
