'use strict';

const express = require('express'),
    v1ApiHandler = require('./v1');

let router = express.Router();

router.use('/v1', v1ApiHandler);

module.exports = router;
