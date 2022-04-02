'use strict';

const express = require('express');

let router = express.Router();

//TODO: Need to create common error handling
router.get('/', (error) => {
    console.log('ERROR Occured', error);
});

module.exports = router;
