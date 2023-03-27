import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { getEditUser } from '../../redux/features/AuthUserSlice'

import './EditAccountPage.css'

export const EditAccountPage = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    const {
        register,
        formState: {
            errors
        },
        handleSubmit,
    } = useForm({
        mode: "onBlur"
    })

    const onSubmit = (data) => {
        const isImage = Boolean(data.image) ? data.image : user.image
        const editUser = {
            "token": user.token,
            "username": user.username,
            "image": isImage,
            "password": data.password
        }
      
        dispatch(getEditUser(editUser))
        navigate("/")
    }

    return (
        <div  className="edit-account-container">
            <h2 className="edit-account-title">Edit Profile</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
            
                <div className="edit-account-input-prompt">Username</div>
                <input
                    className="edit-account-input"
                    defaultValue={user.username}    
                />

                <div className="edit-account-prompt">Email address</div>
                <input
                    className="edit-account-input"
                    defaultValue={user.email}
                />

                <div className='wrapper'>
                    <div className="edit-account-input-prompt">Password</div>
                    <input
                        name="password"
                        className="edit-account-input"
                        // type="password"
                        placeholder="Password"
                        {...register('password', {
                            required: 'Введите новый пароль',
                            minLength: {
                              defaultValue: 6,
                              message: 'Пароль должен быть не менее 6 символов',
                            },
                            maxLength: {
                              defaultValue: 40,
                              message: 'Пароль должен быть не более 40 символов',
                            }
                        })}
                    />
                    <div className='message-error'>{errors?.password && <span>{errors?.password.message}</span>}</div>
                </div>

                <div className='wrapper'>
                    <div className="edit-account-input-prompt">Avatar image (url)</div>
                    <input
                        className="edit-account-input"
                        placeholder="Avatar image"
                        {...register('image')}
                    />
                    <div className='message-error'>{errors?.image && <span>{errors?.image.message}</span>}</div>
                </div>

                <button className="edit-account-btn" type="submit">Create</button>
                
            </form>
        </div>
    )
}