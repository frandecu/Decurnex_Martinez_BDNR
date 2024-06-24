import express from 'express';

import { ApiRouter } from './routes/routes';
import { errorHandler } from './middlewares';

const port = 3002;

const app = express();

app.use(express.json());
app.use('/', ApiRouter);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
