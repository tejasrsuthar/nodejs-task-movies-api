const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const routes = require('./routes');
const bodyParser = require('body-parser');
const authGate = require('./middlewares/authGate');
const gracefulShutdown = require('http-graceful-shutdown');

const {
  ReasonPhrases,
  StatusCodes,
} = require('http-status-codes');
const { SERV_ERR, GEN_MSG } = require('./utils/constants');
require('dotenv').config();

(async () => {
  const app = express();

  // secure the service by adding headers
  app.use(helmet());

  // parse requests of content-type - application/json
  app.use(bodyParser.json());

  // db connection
  const db = require('./models');
  await db.mongoose
    .connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => {
      console.error(SERV_ERR.CAN_NOT_CONNECT_TO_DB, err);
      process.exit();
    });
  console.info(GEN_MSG.DB_CONNECTED);

  // healthcheck endpoint
  app.get('/healthcheck', (req, res) => res.status(StatusCodes.OK).send({ status: ReasonPhrases.OK }));

  // logger setup
  app.use(logger('dev'));

  // request authorization gate
  app.use(authGate);

  // initialize all routes
  routes.init(app);

  // port configuration
  const port = process.env.APP_PORT || 4000;

  // listen to the specified port
  server = app.listen(port, () => {
    console.info(GEN_MSG.APP_LISTENING_ON, `http://localhost:${port}`);
  });

  const cleanup = async () => {
    // close the database connection 
    console.info(GEN_MSG.DB_CONNECTION_CLOSING);
    await db.mongoose.connection.close();
    console.info(GEN_MSG.DB_CONNECTION_CLOSED);
  };

  const finalShutdown = () => {
    console.info(GEN_MSG.SERVER_SHUTTING_DOWN);
  }

  /**
   * Gracefully shutting down the server
   * we need to make sure we close the db connection
   * or any other external conections/resources
   */
  const opts = {
    signals: 'SIGINT SIGTERM',
    timeout: 10000,                   // timeout: 10 secs
    forceExit: true,                  // triggers process.exit() at the end of shutdown process
    onShutdown: cleanup,              // shutdown function (async) - e.g. for cleanup DB, ...
    finally: finalShutdown            // finally function (sync) - e.g. for logging
  };
  gracefulShutdown(server, opts);
})();

