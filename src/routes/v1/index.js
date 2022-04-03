'use strict';

const express = require('express'),
  moviesHandler = require('../../handlers/movies');

let router = express.Router();

router.use('/movies', moviesHandler);

module.exports = router;
