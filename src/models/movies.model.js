module.exports = mongoose => {
	var schema = mongoose.Schema(
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

	return mongoose.model('movies', schema);
};
