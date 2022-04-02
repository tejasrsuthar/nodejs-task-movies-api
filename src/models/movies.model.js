const { MODELS } = require("../utils/constants");

const moviesModel = (mongoose) => {
	const schema = mongoose.Schema(
		{
			userId: String,
			title: String,
			released: String,
			genre: String,
			director: String,
		},
		{ timestamps: true }
	);

	schema.method('toJSON', function() {
		const { __v, _id, ...object } = this.toObject();
		object.id = _id;
		return object;
	});

	return mongoose.model(MODELS.MOVIES, schema);
}

module.exports = moviesModel;
