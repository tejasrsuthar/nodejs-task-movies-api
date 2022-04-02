// auth gate to protect unauthorized requests

const { AUTH_ERR } = require("../utils/constants");
const { parseBearer, verifyToken } = require("../utils/auth");
const { StatusCodes } = require('http-status-codes');

/**
 * main auth middleware to verify all incoing requests
 * @param {*} req incoming http request
 * @param {*} res outgoing response
 * @param {*} next pass request to next middleware
 */
function authGate(req, res, next) {
	const authorizationHeader = req.headers["authorization"];
	const token = parseBearer(authorizationHeader);

	const { status, decoded } = verifyToken(token);

	if (status && decoded) {
		req.user = decoded;
		return next();
	} else {
		const response = {
			status: 'ERROR',
			error: AUTH_ERR.INVALID_TOKEN,
			data: null,
		};
		return res.status(StatusCodes.FORBIDDEN).json(response);
	}
}

module.exports = authGate;
