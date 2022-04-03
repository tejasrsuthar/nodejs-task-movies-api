process.env.NODE_ENV = 'test';

const { addMovie, getUserRole } = require('../../services/movies');
const basicUser = require('./mock/user/basic-user.json');
const { GEN_ERR, USER_ROLES } = require('../../utils/constants');
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const Models = require('../../models/index');
const premiumUser = require('./mock/user/premium-user.json');
const { StatusCodes } = require('http-status-codes');

describe('addMovie service', () => {

  it('should validate incoming request', async () => {
    const moviesFindMock = Models.movies.find = jest.fn();
    moviesFindMock.mockImplementation(() => ({ count: () => 20 }));

    // setup mocks
    const res = mockResponse();
    // passing request without title
    const req = mockRequest({ user: premiumUser, body: {} });

    // execute service
    await addMovie(req, res);
    const errorResponse = { status: 'ERROR', userMessage: '"title" is required', data: null, error: null }

    // assertions
    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(res.send).toHaveBeenCalledWith(errorResponse);
  });

  it('should handle unknown error', async () => {
    // setup mocks
    const moviesFindMock = Models.movies.find = jest.fn();
    moviesFindMock.mockImplementation(() => { throw new Error('some unknown error') });

    const res = mockResponse();
    const req = mockRequest({ user: basicUser });

    // execute service
    await addMovie(req, res);

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

  it('should restrict basic user to predefined allowed limit', async () => {
    // setup mocks
    const moviesFindMock = Models.movies.find = jest.fn();
    // set the total more than the basic user limit to simulate the error scenario
    moviesFindMock.mockImplementation(() => ({ count: () => 7 }));
    const res = mockResponse();
    const req = mockRequest({ user: basicUser });

    // execute service
    await addMovie(req, res);

    const addMovieResponse = {
      status: 'ERROR',
      data: null,
      userMessage: GEN_ERR.BASIC_USER_MAX_LIMIT_REACHED,
      error: null,
    };

    // assertions
    expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_ACCEPTABLE);
    expect(res.send).toHaveBeenCalledWith(addMovieResponse);
  });
});

describe('getUserRole function', () => {
  it('should defaults to basic role', () => {
    const role = getUserRole();

    // assertions
    expect(role).toEqual(USER_ROLES.BASIC);
  });
});
