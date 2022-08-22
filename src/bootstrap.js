import { connectDB } from '#Config/initialize-db.js';
import { initializeHttpServer } from '#Config/initialize-http.js';
import { config as dotenvConfig } from 'dotenv';

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
