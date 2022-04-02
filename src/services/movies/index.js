'use strict';

const { get, post } = require('../../utils/axios');
const {
	ReasonPhrases,
	StatusCodes,
} = require('http-status-codes');
const { addMoviesSchema } = require('../../utils/joiSchema');
const { joiDefaults, getCurrentMonth } = require('../../utils/common');
const { getOMDBMovies } = require('../../utils/api-helper');
const { GEN_ERR, USER_ROLES } = require('../../utils/constants');
const db = require('../../models');

/**
 * @description The function to get all movie records
 * @param {Object} req - The express request object
 * @param {Object} res - The express response object
 */
async function getMoviesByUserId(req, res) {
	try {
		const { user: { userId } } = req;
		const movies = await db.movies.find({ userId });

		const response = { status: 'OK', data: { movies }, error: null };
		res.status(StatusCodes.OK).send(response);
	} catch (error) {
		const response = {
			status: 'ERROR',
			data: null,
			userMessage: GEN_ERR.SOMETHING_WENT_WRONG,
			error: error.message,
		};
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(response);
	}
}

/**
 * @description The function to add movie to a user account
 * @param {Object} req - The express request object
 * @param {Object} res - The express response object
 */
async function addMovie(req, res) {
	try {
		const { user: { userId } } = req;

		if (!userAllowedToAddMovie(req)) {
			const response = {
				status: 'ERROR',
				data: null,
				userMessage: "User max limit reached",
				error: error.message,
			};
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(response);
		}

		// input Validation gate
		const isValid = addMoviesSchema.validate(req.body, joiDefaults);

		if (isValid.error) {
			const errorMessage = isValid.error.details.map((d) => d.message).join(', ');
			const response = { status: 'ERROR', userMessage: errorMessage, data: null };
			return res.status(StatusCodes.BAD_REQUEST).send(response);
		}

		// always get sanatized value after validation
		const { title } = isValid.value;

		const movieResponse = await getOMDBMovies(title);

		if (movieResponse && movieResponse.Response === 'False') {
			const response = { status: 'OK', data: null, userMessage: movieResponse.Error };
			return res.status(StatusCodes.NOT_FOUND).send(response);
		}

		const { Title: mTitle, Released: released, Genere: genere, Director: director } = movieResponse;
		const params = { userId, title: mTitle, released, genere, director };
		console.info('params', params);
		const resp = await (new db.movies(params).save());

		const response = {
			status: 'OK',
			data: resp,
			userMessage: "Movie has been added successfully",
			error: null
		};

		return res.status(StatusCodes.OK).send(response);
	} catch (error) {
		const response = {
			status: 'ERROR',
			data: null,
			userMessage: GEN_ERR.SOMETHING_WENT_WRONG,
			error: error.message,
		};
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(response);
	}
}

/**
 * Get the user role
 * @param {*} user user object injected from middleware
 * @returns user's role basic | premium
 */
const getUserRole = (user) => {
	if (!user) {
		return USER_ROLES.BASIC;
	}

	return user.role;
}


/**
 * decide to allow user to add movie or not
 * @param {*} req incoming request
 * @returns boolean 
 */
const userAllowedToAddMovie = async (req) => {

	const { user, user: { userId } } = req;
	const currentUserRole = getUserRole(user);

	// for premium user, we allowed unlimited movies to be added
	if (currentUserRole === USER_ROLES.PREMIUM) {
		return true;
	} else if (currentUserRole === USER_ROLES.BASIC) {
		// for basic user there is limit
		const calendarMonth = getCurrentMonth();
		// get user movies per calendar month
		const movies = await db.movies.find({ userId }).where({});
	}

	return true;
}

module.exports = {
	getMovies: getMoviesByUserId,
	addMovie
};
