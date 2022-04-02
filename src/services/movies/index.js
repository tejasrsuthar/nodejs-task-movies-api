'use strict';

const {
	ReasonPhrases,
	StatusCodes,
} = require('http-status-codes');
const { addMoviesSchema, getMoviesSchema } = require('../../utils/joiSchema');
const { generateUUID, joiDefaults } = require('../../utils/common');

/**
 * @description The function to get all movie records
 * @param {Object} req - The express request object
 * @param {Object} res - The express response object
 */
async function getMovies(req, res) {
	// ------------------------------------------------
	// Action execution
	// ------------------------------------------------


	// ------------------------------------------------
	// Response
	// ------------------------------------------------
	const response = {
		status: 'OK',
		data: {
			movies: [{
				test: true,
			}]
		},
	};
	res.status(StatusCodes.OK).send(response);
}

/**
 * @description The function to add movie to a user account
 * @param {Object} req - The express request object
 * @param {Object} res - The express response object
 */
async function addMovie(req, res) {
	// input Validation gate
	const isValid = addMoviesSchema.validate(req.body, joiDefaults);

	if (isValid.error) {
		const errorMessage = isValid.error.details.map((d) => d.message).join(', ');
		const response = {
		  status: 'ERROR',
		  userMessage: errorMessage,
		  data: null,
		};
		return res.status(StatusCodes.BAD_REQUEST).send(response);
	}
	
	const { title } = isValid.value;

	// Action execution
	
	// Response
	const response = {
		status: 'OK',
		data: {
			movies: [{
				test: true,
			}]
		},
	};
	res.status(StatusCodes.OK).send(response);
}

module.exports = {
	getMovies,
	addMovie
};
