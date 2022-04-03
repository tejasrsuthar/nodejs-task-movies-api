'use strict';

const Joi = require('joi');

const addMoviesSchema = Joi.object({
	title: Joi.string().required()
});

module.exports = {
	addMoviesSchema,
}