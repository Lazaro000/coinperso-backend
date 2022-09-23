import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import { userRoutes } from '#Routes/user.routes.js';
import { errorMiddleware } from '#Middlewares/error.middleware.js';
import { portfolioRoutes } from '#Routes/portfolio.routes.js';
import { ROUTES } from '../constants/routes.constant.js';

export const initializeHttpServer = () => {
  const expressApp = express();

  expressApp.use(express.json());
  expressApp.use(cors());

  // Routes
  expressApp.use(ROUTES.USER, userRoutes);
  expressApp.use(ROUTES.PORTFOLIO, portfolioRoutes);

  // Middlewares
  expressApp.use(errorMiddleware);

  const httpServer = createServer(expressApp);

  return httpServer;
};
