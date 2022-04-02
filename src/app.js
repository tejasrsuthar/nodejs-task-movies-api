const express = require('express');
const logger = require('morgan');
const routes = require('./routes');
const bodyParser = require('body-parser');
const { StatusCodes, ReasonPhrases } = require('./utils/status-codes/all');

let server = null;

async function init() {
  const app = express();
  app.use(bodyParser.json());

  // healthcheck endpoint
  app.get('/healthcheck', (req, res) => res.status(StatusCodes.OK).send({status: ReasonPhrases.OK }));

  // logger setup
  app.use(logger('dev'));

  // initialize all routes
  routes.init(app);

  // port configuration
  const port = process.env.PORT || 4000;

  // listen to the specified port
  server = app.listen(port);

  console.info(`> App listening on http://localhost:${port}`);
}

init();
