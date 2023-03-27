import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

import './EditArticlePage.css'

export const EditArticlePage = () => {
    const {id} = (useParams())

    const [article, setArticle] = useState({})
    const [tags, setTags] = useState([])
    const [tagInputValue, setTagInputValue] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`https://blog.kata.academy/api/articles/${id}`)
         .then(res => res.json())
         .then(art => {
            setArticle(art.article)
            setTags(art.article.tagList)
         })
         .catch(err => {
             console.warn(err)
             alert('Ошибка при получении статьи')
             navigate("/")
           })
     }, [])

    const {
        register,
        formState: {
            errors
        },
        handleSubmit
    } = useForm({
        mode: "onBlur"
    })

    const onSubmit = (data) => {
        const article = {
            "title": data.title,
            "description": data.description,
            "body": data.body,
        }
        fetch('https://blog.kata.academy/api/articles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + window.localStorage.getItem('token'),
            },
            body: JSON.stringify({ article: { ...article } }),
        })
        .then(res => navigate("/"))
        .catch((error) => {
            console.warn(error)
        })
    }

    const addTag = (e) => {
        e.preventDefault()
        if (tags.includes(tagInputValue)) {
            alert('Вы уже ввели данный тег ранее')
        } else if (tagInputValue.length === 0) {
            alert('Введите значение тега')
        } else {
            setTags([...tags, tagInputValue])
        }
        setTagInputValue('')
    }

    return (
        <div  className="edit-article-container">
            <h2 className="edit-article-title">Edit article</h2>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className='wrapper'>
                    <div className="edit-article-input-prompt">Title</div>
                    <input
                        className="edit-article-input"
                        placeholder="Title"
                        defaultValue={article.title ? article.title : null}
                        {...register('title', {
                            required: "Поле обязательно к заполнению!",
                        })}
                    />
                    <div className='message-error'>{errors?.title && <span>{errors?.title.message}</span>}</div>
                </div>

                <div className='wrapper'>
                    <div className="edit-article-input-prompt">Short description</div>
                    <input
                        className="edit-article-input"
                        placeholder="Description"
                        defaultValue={article.description ? article.description : null}
                        {...register('description')}
                    />
                </div>

                <div className='wrapper'>
                    <div className="create-article-input-prompt">Text</div>
                    <textarea
                        className="create-article-textarea"
                        placeholder="Text"
                        defaultValue={article.body ? article.body : null}
                        {...register('body', {
                            required: "Поле обязательно к заполнению!",
                        })}
                    />
                    <div className='textarea-message-error'>{errors?.body && <span>{errors?.body.message}</span>}</div>
                </div>

                <div className="create-article-input-prompt">Tags</div>
                {tags.map((elem) => {
                    return(
                        <div key={elem} className="added-tags">
                            <span className="create-article-tag-input">{elem}</span>
                            <button 
                                className="create-article-delete-btn" 
                                onClick={(e) => {
                                    e.preventDefault()
                                    const sortedTags = tags.filter(tag => tag !== elem)
                                    setTags([...sortedTags])
                                    }
                                }
                            >delete</button>
                        </div>
                    )
                })}
                <div  className='wrapper-tags'>
                    <input
                        className="create-article-tag-input"
                        placeholder="Tag"
                        value={tagInputValue}
                        onChange={(e) => setTagInputValue(e.target.value)}
                    />
                    <button className="create-article-delete-btn">Delete</button>
                    <button className="create-article-add-btn" 
                        onClick={(e) => addTag(e)}>Add tag</button>
                </div>
                        
                <button className="create-article-btn" type="submit">Send</button>
            </form>
        </div>
    )
}