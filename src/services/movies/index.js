'use strict';

const { get, post } = require('../../utils/axios');
const {
	ReasonPhrases,
	StatusCodes,
} = require('http-status-codes');
const { addMoviesSchema, getMoviesSchema } = require('../../utils/joiSchema');
const { joiDefaults } = require('../../utils/common');
const { getOMDBMovies } = require('../../utils/api-helper');
const { GEN_ERR } = require('../../utils/constants');

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

	try {
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

		const movie = await getOMDBMovies(title);

		if (movie && movie.Response === 'False') {
			const response = {
				status: 'OK',
				data: null,
				userMessage: movie.Error,
			};
			return res.status(StatusCodes.NOT_FOUND).send(response);
		}

		const { Title, Released, Genre, Director } = movie;

		const response = {
			status: 'OK',
			data: { Title, Released, Genre, Director },
		};
		res.status(StatusCodes.OK).send(response);
	} catch (error) {
		const response = {
			status: 'ERROR',
			data: null,
			userMessage: GEN_ERR.SOMETHING_WENT_WRONG,
			error: error.message,
		};
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(response);
	}
}

module.exports = {
	getMovies,
	addMovie
};
