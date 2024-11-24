import mongoose, { model, Schema } from 'mongoose';

const orderSchema = new Schema(
  {
    email: { type: String, required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true },
);

const OrderModel = model('Order', orderSchema);

export default OrderModel;
