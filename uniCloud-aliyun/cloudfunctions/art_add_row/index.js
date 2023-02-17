const db = uniCloud.database()
exports.main = async (event, context) => {
	let {value} = event
	return await db.collection("article").add({
		...value,
		posttime: Date.now()
	})
};
