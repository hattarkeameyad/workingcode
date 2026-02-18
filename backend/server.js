import path from 'path';
import express from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
const allowedOrigins = [
  'http://localhost:3000','d3s9dbcunjn6lr.cloudfront.net',
  'https://frontendbackendinvps.s3-website-us-east-1.amazonaws.com',
  'http://frontendbackendinvps.s3-website-us-east-1.amazonaws.com',
];
app.use(
  cors({
    origin: allowedOrigins,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use('/api/users', userRoutes);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, '0.0.0.0',() => console.log(`Server started on port ${port}`));
