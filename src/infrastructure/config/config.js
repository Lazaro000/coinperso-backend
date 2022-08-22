import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export default {
  PORT: process.env.PORT || 3500,
  jwtSecretKey: process.env.JWT_SECRET || 'somesecrettoken',
  DB: {
    URI: process.env.MONGODB_URI || 'mongodb://localhost/jwttutorial',
    USER: process.env.MONGODB_USER,
    PASSWORD: process.env.MONGODB_PASSWORD,
  },
};
