const db = uniCloud.database()
exports.main = async (event, context) => {
	let {value, picUrl} = event
	return await db.collection("article").add({
		...value,
		picUrl,	
		posttime: Date.now()
	})
};
