import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import './CreateArticlePage.css'

export const CreateArticlePage = () => {

    const [tags, setTags] = useState([])
    const [tagInputValue, setTagInputValue] = useState('')
    const navigate = useNavigate()


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
            "tagList": tags,
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
        <div  className="create-article-container">
            <h2 className="create-article-title">Create new article</h2>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className='wrapper'>
                    <div className="create-article-input-prompt">Title</div>
                    <input
                        className="create-article-input"
                        placeholder="Title"
                        {...register('title', {
                            required: "Поле обязательно к заполнению!",
                        })}
                    />
                    <div className='message-error'>{errors?.title && <span>{errors?.title.message}</span>}</div>
                </div>

                <div className='wrapper'>
                    <div className="create-article-input-prompt">Short description</div>
                    <input
                        className="create-article-input"
                        placeholder="Description"
                        {...register('description')}
                    />
                </div>

                <div className='wrapper'>
                    <div className="create-article-input-prompt">Text</div>
                    <textarea
                        className="create-article-textarea"
                        placeholder="Text"
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
                <div><button className="create-article-btn" type="submit">Send</button></div>
            </form>
        </div>
    )
}