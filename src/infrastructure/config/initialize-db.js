import mongoose from 'mongoose';
import { config as dotenvConfig } from 'dotenv';
import config from '#Config/config.js';

dotenvConfig();

export const connectDB = async () => {
  try {
    await mongoose.connect(config.DB.URI, {
      connectTimeoutMS: 4000,
    });
  } catch (error) {
    console.error(error);
  }
};

mongoose.connection.on('connected', () => {
  console.log('Mongodb is connected to', mongoose.connection.db.databaseName);
});
