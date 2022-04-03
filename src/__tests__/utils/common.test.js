`use strict`

const dayjs = require('dayjs');
const { getCurrentMonth } = require("../../utils/common");

test('getCurrentMonth should get the calendar month', () => {

    // month method gives index, need to add 1 to get the calendar month
    const calendarMonth = dayjs().month() + 1;

    expect(getCurrentMonth()).toEqual(calendarMonth);
});