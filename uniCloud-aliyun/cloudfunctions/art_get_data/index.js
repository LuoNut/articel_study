const db = uniCloud.database()
exports.main = async (event, context) => {
	let {skip} = event
	return db.collection("article").limit(7).skip(skip).orderBy("posttime", "desc").get()
};
