import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useNavigate, Link } from "react-router-dom"
import { LinearProgress} from "@mui/material"
import { putLike, deleteLike } from "../../components/services/likeService"

import './SingleArticlePage.css'

export const SingleArticlePage = () => {

    const {id} = (useParams())
    const navigate = useNavigate()
    const userName = useSelector(state => state.user.username)
    
    const [isAuth, setAuth] = useState(Boolean(window.localStorage.getItem('token')))
    const [article, setArticle] = useState()
    const [isAccess, setAccess] = useState(false)
    const [isLiked, setIsLiked] = useState(0)
    const [likes, setLikes] = useState(0)

    // Получаем статью с сервера 
    useEffect(() => {
        fetch(`https://blog.kata.academy/api/articles/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${window.localStorage.getItem('token')}`,
            }})
         .then(res => res.json())
         .then(art => {
             setArticle(art.article)
             setLikes(art.article.favoritesCount)
             setIsLiked(art.article.favorited)
         })
         .catch(err => {
             console.warn(err)
             alert('Ошибка при получении статьи')
             navigate("/")
           })
     }, [])
    
    // Устанавливаем, может ли пользователь удалять и рекадктировать статью
    useEffect(() => {
        if (!isEmpty(article)) {
            const state = (isAuth && userName === article.author.username)
            setAccess(state)
        }    
    }, [article])

    // Получаем дату создания статьи в нужном формате
    const date = (date) => {
        const months = [
            'January', 'February', 'March', 'April', 
            'May', 'June', 'July', 'August', 
            'September', 'October', 'November', 'December'
        ]
        const time = new Date(date)
        const monthNum = time.getMonth()
        let timeString = `${months[monthNum]} ${time.getDate()}, ${time.getFullYear()}`
        return timeString
    }

    //Вспомогательная функция, которая определяет, пустой объект или нет 
    const isEmpty = (obj) => {
        for (let key in obj) return false
        return true
    }

    // Удаляем статью
    const onClickRemove = () => {
        if (window.confirm('Вы действительно хотите удалить статью?')) {
            fetch(`https://blog.kata.academy/api/articles/${article.slug}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + window.localStorage.getItem('token'),
            },
        })
        .then(res => navigate("/"))
        .catch((error) => {
            console.warn(error)
        })
        }
    }

    // Проставляем и удаляет лайки 
    const giveLike = async () => {
        if (!isAuth) return
        if (!isLiked) {
            const data = await putLike(article.slug)
            setLikes(data.article.favoritesCount)
            setIsLiked(data.article.favorited)
        } else {
            const data = await deleteLike(article.slug)
            setLikes(data.article.favoritesCount)
            setIsLiked(data.article.favorited)
        }
    }
    
    return (
        <>
            { 
                (!isEmpty(article)) ?
                <div className="article">
                    <div className="article-header">
                        <div>
                            <div className="article-header__right-part">
                                <h1 className="article__title">{article.title}</h1>
                                <button className="like-btn" onClick={giveLike}>
                                    {isLiked ? 
                                    <i className="material-icons">favorite</i> :
                                    <i className="material-icons">favorite_border</i>}
                                </button>
                                <span>{likes}</span>
                                
                            </div>
                            {article.tagList.length > 0 
                                ? (article.tagList.map((elem, ind) => <span key={ind} className="article-tag">{elem}</span>)) 
                                : null}
                            <p className="article-description">{article.description}</p>
                        </div>

                        <div className="article-header__left-part">
                            <div className="user-info">
                                <div className="user-info__wrapper">
                                    <p className="user-info__name">{article.author.username}</p>
                                    <p className="user-info__data">{date(article.createdAt)}</p> 
                                </div>
                                <img className="author-avatar" src={article.author.image} alt="Author"/>
                            </div>
                            {isAccess 
                                ? <>
                                    <button className="btn btn-delete" onClick={onClickRemove}>Delete</button>
                                    <Link to={`/edit-article/${article.slug}`}>
                                        <button className="btn btn-edit">Edit</button>
                                    </Link>
                                </>
                                : null                               
                            }
                        </div>
                    </div>
                    <p className="article-body">
                        {article.body}
                    </p>
                </div>
                : <LinearProgress />
            }
        </>
    )
}