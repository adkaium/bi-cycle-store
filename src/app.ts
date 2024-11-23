import express, { Application, Request, Response } from 'express';
import { ProductRoutes } from './app/modules/product/product.routes';
import { OrderRoutes } from './app/modules/orders/order.router';
const app: Application = express();
const port = 3000;

// parsser
app.use(express.json());


//application routes
app.use('/api/products', ProductRoutes);
app.use('/api/orders',OrderRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('abdul');
});
console.log(port);
console.log(process.cwd());
export default app;
