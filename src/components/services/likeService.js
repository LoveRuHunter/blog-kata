export const putLike = async (id) => {
	const data = await fetch(`https://blog.kata.academy/api/articles/${id}/favorite`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Token ' + window.localStorage.getItem('token'),
		}})
		.then(res => res.json())
	return data
}

export const deleteLike = async (id) => {
	const data = await fetch(`https://blog.kata.academy/api/articles/${id}/favorite`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Token ' + window.localStorage.getItem('token'),
		}})
		.then(res => res.json())
	return data
}