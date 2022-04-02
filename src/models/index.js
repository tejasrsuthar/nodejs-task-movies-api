const { url } = require("../utils/db-config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = url;
db.movies = require("./movies.model.js")(mongoose);

module.exports = db;