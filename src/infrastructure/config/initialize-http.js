import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import { userRoutes } from '#Routes/user.routes.js';
import { errorMiddleware } from '#Middlewares/error.middleware.js';

export const initializeHttpServer = () => {
  const expressApp = express();

  expressApp.use(express.json());
  expressApp.use(cors());

  // Routes
  expressApp.use(userRoutes);

  // Middlewares
  expressApp.use(errorMiddleware);

  const httpServer = createServer(expressApp);

  return httpServer;
};
