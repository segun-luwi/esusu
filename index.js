import config from './config/config.js';
import app from './config/express.js';
import path from "path";
import mongoose from "mongoose";
import { createServer } from 'http';
import errorhandler from 'errorhandler';
import cron from "node-cron";
const { schedule } = cron;
import { addFixedAmount } from "./controllers/group.controller.js";

const mongoURL = config.dbUrl;
mongoose.connect(mongoURL, {
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}).then(() => console.log("Database connected!"))
.catch(err => console.log(err));;

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

// cron jobs
schedule('* 10 * * 6', addFixedAmount);

export default app;