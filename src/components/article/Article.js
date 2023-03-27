import { useState } from 'react'
import { Link } from 'react-router-dom'
import { putLike, deleteLike } from '../services/likeService'

import './Article.css'

export const Article = (props) => {

	const {slug, author, title, body, createdAt, favoritesCount, favorited, tagList } = props

	const [isLiked, setIsLiked] = useState(favorited)
	const [likes, setLikes] = useState(favoritesCount)

	const date = (date) => {
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
		const time = new Date(date)
		const monthNum = time.getMonth()
		let timeString = `${months[monthNum]} ${time.getDate()}, ${time.getFullYear()}`
		return timeString
	}

	const giveLike = async () => {
		if (!isLiked) {
			const {article} = await putLike(slug)
			setLikes(article.favoritesCount)
			setIsLiked(article.favorited)
		} else {
			const {article} = await deleteLike(slug)
			setLikes(article.favoritesCount)
			setIsLiked(article.favorited)
		}
	}

	return (
		<div key={slug} className="article-item">
			<div className="article-item__right-part">
				<div>
					<div className='title-wrapper'>
						<Link className="article-item__title" to={`/${slug}`}>
							<h2 className="article-item__title">{
								title.length > 50 ? title.slice(0, 50) : title
							}</h2>
						</Link>
							
						<button className="like-btn" onClick={giveLike}>
							{isLiked ? 
							<i className="material-icons">favorite</i> :
							<i className="material-icons">favorite_border</i>}
						</button>
						<span>{likes}</span>
					</div>
					<div className="tags-wrapper">
						{tagList.map((tag, ind) => <span key={ind} className="tag">{tag}</span>)}
					</div>
				</div>
				<p className="content">{
					body.length > 200 ? `${body.slice(0, 200)}...` : body
				}</p>
			</div>
			<div className="article-item__left-part">
				<div className="article-info">
					<div className="author-name">{author.username}</div>
					<div className="publication-date">{ date(createdAt) }</div>
				</div>
					<img className="article-photo" src={author.image} alt="Author" />
			</div>
		</div>
	)
}