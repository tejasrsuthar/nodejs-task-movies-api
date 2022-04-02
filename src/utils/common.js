const { customAlphabet } = require('nanoid');

const generateUUID = () => {
  /**
   * ~46 thousand years needed, in order to have a 1% probability of at least one collision.
   */
  const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 16);
  const id = nanoid(); // => "FXA1Z3D9T27W8ZI1";
  return id;
};

const joiDefaults = {
    abortEarly: false,
    stripUnknown: true,
};

module.exports = {
  generateUUID,
  joiDefaults
}
