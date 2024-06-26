import express from 'express';
import { ApiRouter } from './routes';
import { errorHandler } from './middlewares';

const port = 3000;

const app = express();

app.use(express.json());
app.use('/api', ApiRouter);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
