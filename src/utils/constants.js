// common app wide constants

//TODO: more localized approach can be possible here, if time permits :P
const AUTH_ERR = {
	INVALID_TOKEN: 'Invalid Token',
}

const GEN_ERR = {
	SOMETHING_WENT_WRONG: 'Something went wrong! Please try again later',
	BASIC_USER_MAX_LIMIT_REACHED: 'You have reached your max limit for adding movies!'
}

const MODELS = {
	MOVIES: 'movies',
}

const MOVIES = {
	USER_MOVIE_ADD_SUCCESS: 'Movie has been added successfully!',
	ADD_LIMITS: {
		// max limit of movies basic user can add
		BASIC_USER: 5, 

		// for premium user, we're assuming 0 means unlimited
		PREMIUM_USER: 0 
	}
}

const USER_ROLES = { BASIC: 'basic', PREMIUM: 'premium' };
const API_URLS = { BASE_URL: process.env.OMDB_API_URL }

module.exports = {
	GEN_ERR,
	AUTH_ERR,
	API_URLS,
	USER_ROLES,
	MOVIES,
	MODELS
}
