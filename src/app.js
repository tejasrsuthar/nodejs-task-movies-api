const express = require('express');
const logger = require('morgan');
const routes = require('./routes');
const bodyParser = require('body-parser');
const authGate = require('./middlewares/authGate');
const {
  ReasonPhrases,
  StatusCodes,
} = require('http-status-codes');

// load env variables
require('dotenv').config()

let server = null;

async function init() {
  const app = express();
  app.use(bodyParser.json());

  // healthcheck endpoint
  app.get('/healthcheck', (req, res) => res.status(StatusCodes.OK).send({ status: ReasonPhrases.OK }));

  // logger setup
  app.use(logger('dev'));

  app.use(authGate);

  // initialize all routes
  routes.init(app);

  // port configuration
  const port = process.env.PORT || 4000;

  // listen to the specified port
  server = app.listen(port);

  console.info(`> App listening on http://localhost:${port}`);
}

init();
