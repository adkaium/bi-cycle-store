import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/product/product.routes';
import { OrderRoutes } from './app/modules/orders/order.router';
const app: Application = express();

// parsser
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});

//application routes
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

export default app;
