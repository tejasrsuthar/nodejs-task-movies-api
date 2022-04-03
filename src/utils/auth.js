// util functions related to auth
'use strict';

const { isEmpty } = require('lodash');
const jwt = require("jsonwebtoken");

/**
 * Funtion to parse bearer token
 * @param {*} bearer Authorization header coming from request
 * @returns token string
 */
const parseBearer = (bearer) => {
	if (isEmpty(bearer)) {
		return null;
	}
	const [_, token] = bearer.trim().split(" ");
	return token;
};

const verifyToken = (token) => {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		return { status: true, decoded };
	} catch (error) {

		// further error types needs to be extracted
		return { status: false, error }
	}
}

module.exports = {
	parseBearer,
	verifyToken
}