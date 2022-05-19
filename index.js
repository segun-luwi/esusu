import config from './config/config.js';
import app from './config/express.js';
import path from "path";
import mongoose from "mongoose";
import { createServer } from 'http';
import errorhandler from 'errorhandler';

app.use((req, res, next) => 
{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') 
  {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
  }

  next();
});

app.use(errorhandler());
process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});
process.on('unhandledRejection', (reason) => {
  console.log('Unhandled Rejection at:', reason.stack || reason);
});
const port = config.port || 4400;
createServer(app).listen(port, () => {
  console.log('Express server listening on port 5010');
});

export default app;