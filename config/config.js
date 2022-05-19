// require and configure dotenv, will load vars in .env in PROCESS.ENV
import dotenv from 'dotenv';
dotenv.config();

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
};

export default config;
