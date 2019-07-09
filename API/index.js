import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import 'babel-polyfill';

import Cors from './middlewares/cors';
import ErrorHandler from './middlewares/errorHandler';
import userRoutes from './routes/user.routes';

require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { cors } = Cors;
const { errorHandler404 /* errorHandler500 */ } = ErrorHandler;

// CORS
app.use(cors);

app.get('/', (req, res) => res.send('Welcome to PropertyPro'));

app.use('/api/v1/auth', userRoutes);

// Error Handler
app.use(errorHandler404);
// app.use(errorHandler500);

app.listen(port, () => {
  console.log(`PropertyPro is listening on ${port}`);
});

export default app;
