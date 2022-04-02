// common app wide constants

//TODO: more localized approach can be possible here, if time permits :P
const AUTH_ERR = {
	INVALID_TOKEN: 'Invalid Token',
}

const GEN_ERR = {
	SOMETHING_WENT_WRONG: 'Something went wrong! Please try again later',
}
const API_URLS = {
	BASE_URL: process.env.OMDB_API_URL,
}

module.exports = {
	GEN_ERR,
	AUTH_ERR,
	API_URLS,
}

