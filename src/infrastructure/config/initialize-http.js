import { createServer } from 'http';
import express from 'express';

export const initializeHttpServer = () => {
  const expressApp = express();

  expressApp.use(express.json());

  const httpServer = createServer(expressApp);

  return httpServer;
};
