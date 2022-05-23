import express from 'express';
const app = express();
import routes from '../routes/index.route.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');  
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD, PATCH, OPTIONS");

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Content-Type', 'application/json');
  // Pass to next layer of middleware
  next();
});

// API router
app.use('/api/v1/', routes);

export default app;