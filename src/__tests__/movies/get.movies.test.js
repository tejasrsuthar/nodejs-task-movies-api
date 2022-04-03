process.env.NODE_ENV = 'test';

const basicUserMovies = require('./mock/basic-user-movies.json');
const { getMovies } = require('../../services/movies');
const { GEN_ERR } = require('../../utils/constants');
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const Models = require('../../models/index');
const { StatusCodes } = require('http-status-codes');

describe('getMovies service', () => {
	const userId = '123';
	it('should return the movies added by user', async () => {

		// setup mocks
		const moviesFindMock = Models.movies.find = jest.fn();
		moviesFindMock.mockReturnValueOnce(basicUserMovies);
		const res = mockResponse();
		const req = mockRequest({ user: { userId } });

		// execute service
		await getMovies(req, res);
		const userMoviesFullResponse = {
			status: 'OK',
			data: {
				movies: basicUserMovies,
			},
			error: null
		};

		// assertions
		expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
		expect(res.send).toHaveBeenCalledWith(userMoviesFullResponse);
	});

	it('should return error for unknown error', async () => {
		// setup mocks
		const moviesFindMock = Models.movies.find = jest.fn();
		moviesFindMock.mockImplementation(() => { throw new Error('some unknown error') });

		const res = mockResponse();
		const req = mockRequest({ user: { userId } });

		// execute service
		await getMovies(req, res);

		const errorResponse = {
			status: 'ERROR',
			data: null,
			userMessage: GEN_ERR.SOMETHING_WENT_WRONG,
			error: 'some unknown error',
		};

		// assertions
		expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
		expect(res.send).toHaveBeenCalledWith(errorResponse);
	});
});
