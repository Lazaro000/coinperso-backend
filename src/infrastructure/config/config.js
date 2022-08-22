import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export default {
  PORT: process.env.PORT || 3500,
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY || 'somesecrettoken',
  DB: {
    HOSTNAME: process.env.MONGODB_HOSTNAME || 'localhost',
    NAME: process.env.MONGODB_DATABASE_NAME || 'coinperso',
    USER: process.env.MONGODB_USER || 'root',
    PASSWORD: process.env.MONGODB_PASSWORD || 'root',
    PORT: process.env.MONGODB_PORT || 27017,
    URI: process.env.MONGODB_URI || 'mongodb://localhost/coinperso',
  },
};
