import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import router from './app/routes';
import { globalErrorHandelar } from './app/middlewares/globalErrorHandelar';
import { notFound } from './app/middlewares/notFound';
const app: Application = express();

// parsser
app.use(cors());
app.use(express.json());
app.use(cookieParser())

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'connect Successfully',
  });
});

//application routes
app.use('/api', router);
app.use(globalErrorHandelar);
app.use(notFound);

export default app;
