import { Request, Response } from 'express';
import { orderservirce } from './order.service';
import { OrderValidationSchema } from './orders.validation';

const createNewOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const zodParsedata = OrderValidationSchema.parse(orderData);

    const order = await orderservirce.createOrder(zodParsedata);

    res.status(201).json({
      message: 'Order created successfully',
      status: true,
      data: order,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message || 'Faild to create order',
      status: false,
    });
  }
};

const getRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await orderservirce.calculteTotalRevenue();

    res.status(200).json({
      message: 'Revenue Calculated Successfully',
      status: true,
      data: { totalRevenue },
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || 'Failed to calculate revenue',
      status: false,
    });
  }
};

export const orderCotroller = {
  createNewOrder,
  getRevenue,
};
