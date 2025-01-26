/* eslint-disable prettier/prettier */

export const {
  PORT = 5000,
  NODE_ENV = 'development',
} = process.env;

export const DATABASE_URL = process.env.DATABASE_URL;
export const API_CORS_ORIGIN = process.env.API_CORS_ORIGIN;
