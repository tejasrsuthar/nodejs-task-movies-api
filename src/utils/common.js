// common util functions across the app
'use strict';

const dayjs = require('dayjs');

/**
 * function to get the calendar month
 * @returns month in number
 */
const getCurrentMonth = () => { return dayjs().month() + 1 };

const joiDefaults = { abortEarly: false, stripUnknown: true };

module.exports = {
  joiDefaults,
  getCurrentMonth
}
