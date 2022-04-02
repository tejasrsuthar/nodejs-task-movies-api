'use strict';

const express = require('express'),
  moviesService = require('../../../services/movies');

let router = express.Router();

router.get('/', moviesService.getMovies);
router.post('/', moviesService.addMovie);

module.exports = router;
