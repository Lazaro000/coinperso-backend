import config from '#Config/config.js';
import { config as dotenvConfig } from 'dotenv';

import { initializeHttpServer } from './infrastructure/config/initialize-http.js';

dotenvConfig();

const bootstrap = async (options) => {
  const httpServer = initializeHttpServer();

  httpServer.listen(options.PORT, () =>
    console.log(
      `🚀 Express server raised in port http://localhost:${options.PORT}`
    )
  );
};

bootstrap({ PORT: config.PORT });
