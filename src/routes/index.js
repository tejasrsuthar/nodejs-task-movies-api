'use strict';

const v1Routes = require('./v1');

const init = (server) => {
  server.get('*', function(req, _, next) {
    console.log('Request was made to: ' + req.originalUrl);
    return next();
  });

  server.use('/v1', v1Routes);
}

module.exports = {
  init,
};
