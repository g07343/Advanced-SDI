function (doc) {
	if (doc._id.substr(0,5) === "json_") {
		emit(doc._id.substr(5), {
			"name": doc.name,
			"console": doc.console,
			"genre": doc.genre,
			"bio": doc.bio,
			"favorite": doc.favorite,
			"cloud": doc.cloud
		});
	}
};