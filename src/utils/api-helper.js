// helper for external api calls
'use strict';


const { API_URLS } = require('./constants');
const { get } = require('./axios');

const paramApiKey = `?apikey=${process.env.OMDB_API_KEY}`;

const getOMDBMovies = (s) => get(`${API_URLS.BASE_URL}/${paramApiKey}&t=${s}`);

module.exports = {
    getOMDBMovies
}
