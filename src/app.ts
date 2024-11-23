import express, { Application, Request, Response } from 'express';
import { ProductRoutes } from './app/modules/product/product.routes';
const app: Application = express();
const port = 3000;

// parsser
app.use(express.json());


//application routes
app.use('/api/products', ProductRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('abdul');
});
console.log(port);
console.log(process.cwd());
export default app;
