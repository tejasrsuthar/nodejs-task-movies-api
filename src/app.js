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

  // parse requests of content-type - application/json
  app.use(bodyParser.json());

  const db = require('./models');

  console.log("URL", db.url);
  
  db.mongoose
    .connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.info("Connected to the database!");

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
        console.info(`> App listening on http://localhost:${port}`);
      });
    })
    .catch(err => {
      console.log("Cannot connect to the database!", err);
      process.exit();
    });
}

init();
