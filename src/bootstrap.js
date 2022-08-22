import { config as dotenvConfig } from 'dotenv';
import { connectDB } from './infrastructure/config/initialize-db.js';
// import mongoose from 'mongoose';

import { initializeHttpServer } from './infrastructure/config/initialize-http.js';

dotenvConfig();

export const bootstrap = async (options) => {
  const httpServer = initializeHttpServer();

  await connectDB();

  httpServer.listen(options.PORT, () =>
    console.log(
      `🚀 Express server raised in port http://localhost:${options.PORT}`
    )
  );
};
