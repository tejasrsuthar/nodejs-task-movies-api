'use strict';

const jwt = require("jsonwebtoken");
const { parseBearer, verifyToken } = require('../../utils/auth');

describe('parseBearer function', () => {
	test('should parse the header and return the token', () => {
		const authBearer = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQzNCwibmFtZSI6IlByZW1pdW0gSmltIiwicm9sZSI6InByZW1pdW0iLCJpYXQiOjE2NDkwMDQ0MjEsImV4cCI6MTY0OTAwNjIyMSwiaXNzIjoiaHR0cHM6Ly93d3cubmV0Z3VydS5jb20vIiwic3ViIjoiNDM0In0.kjkBPiuJKbqLjpU4pfeEAe7ndaCzaig-N62795stJ2A';
		const token = parseBearer(authBearer);

		expect(token).toEqual('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQzNCwibmFtZSI6IlByZW1pdW0gSmltIiwicm9sZSI6InByZW1pdW0iLCJpYXQiOjE2NDkwMDQ0MjEsImV4cCI6MTY0OTAwNjIyMSwiaXNzIjoiaHR0cHM6Ly93d3cubmV0Z3VydS5jb20vIiwic3ViIjoiNDM0In0.kjkBPiuJKbqLjpU4pfeEAe7ndaCzaig-N62795stJ2A');
	});

	test('should return null with empty params', () => {
		const token = parseBearer();
		expect(token).toEqual(null);
	});
});

describe('verifyToken function', () => {
	const token = jwt.sign({ userId: 123 }, 'secret', {
		issuer: "https://www.netguru.com/",
		expiresIn: 30 * 60,
	});

	test('should verify provided token', () => {
		process.env.JWT_SECRET = 'secret';

		const response = verifyToken(token);
		expect(response.status).toEqual(true);
		expect(response.decoded.userId).toEqual(123);
	});

	test('should return status when secret is not provided', () => {
		delete process.env.JWT_SECRET;

		const response = verifyToken(token);
		expect(response.status).toEqual(false);
		expect(response.error.name).toEqual('JsonWebTokenError');
		expect(response.error.message).toEqual('secret or public key must be provided');
	});

});