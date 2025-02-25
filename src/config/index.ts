import { config } from 'dotenv';
import path from 'path';
config({
  path: path.join(__dirname, `../../.env.${process.env.NODE_ENV || 'dev'}`),
});
const { PORT, NODE_ENV, DB_HOST, DB_PORT, DB_USERNAME, 
  DB_PASSWORD, DB_NAME,JWT_SECRET ,JWT_EXPIRES_IN,EMAIL_USER,EMAIL_PASS} = process.env;

export const Config = {
  PORT,
  NODE_ENV,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  JWT_EXPIRES_IN,
  JWT_SECRET,
  EMAIL_USER,
  EMAIL_PASS
};
