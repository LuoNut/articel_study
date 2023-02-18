const db = uniCloud.database()
exports.main = async (event, context) => {
	let {value, picUrl} = event
	return await db.collection("article").doc(value._id).update({
		picUrl,
		title:value.title,
		author:value.author,
		content:value.content
	})
};
