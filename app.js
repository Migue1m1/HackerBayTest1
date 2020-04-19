import express from 'express';
import loginRouter from './src/api/routes/login';
import patchRouter from './src/api/routes/patch';
import thumbRouter from './src/api/routes/thumb';

import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import cors from 'cors';
import logger from './config/winston';

const swaggerDefinition = {
  info: {
    title: "Test 1 Backend",
    description: "Endpoints provided by Test 1.",
    version: "1.0"
  },
  host: 'localhost:3000',
  basePath: "/api",
  produces: ["application/json"],
  security: [
    {
      basicAuth: []
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: [ "./src/api/routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

const app = express();

app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use("/api/v1", loginRouter);
app.use("/api/v1", patchRouter);
app.use("/api/v1", thumbRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(function(req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.get('/', (req, res) => {
  return res.json({
    message: 'HackerBay thumbnails generator - ACCES FIRST api/v1/login'
  })
})

// error handler
app.use(function(err, req, res, next) {
  logger.error(`${err.status || 500} - ${err.message} 
    - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

const port = process.env.PORT || "3000";
const server = app.listen(port);

logger.info(`App is running on  http://localhost:${port}`);

export default server;