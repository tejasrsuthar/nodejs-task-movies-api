// helper for external api calls

const { get } = require('./axios');
const { API_URLS } = require('./constants');

const paramApiKey = `?apikey=${process.env.OMDB_API_KEY}`;

const getOMDBMovies = (s) => get(`${API_URLS.BASE_URL}/${paramApiKey}&t=${s}`);

module.exports = {
    getOMDBMovies
}
