const db = uniCloud.database()
exports.main = async (event, context) => {
	let {value} = event
	return await db.collection("article").doc(value._id).update({
		title:value.title,
		author:value.author,
		content:value.content
	})
};
