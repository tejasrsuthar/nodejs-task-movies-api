// common util functions across the app

const getCurrentMonth = () => { new Date().getMonth() };

const joiDefaults = {
    abortEarly: false,
    stripUnknown: true,
};

module.exports = {
  joiDefaults,
  getCurrentMonth
}
