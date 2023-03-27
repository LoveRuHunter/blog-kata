import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { getUserRegistration } from '../../redux/features/AuthUserSlice'

import './CreateAccountPage.css'

export const CreateAccountPage = () => {

    const dispatch = useDispatch()
    const userData = useSelector(state => state.user)

    const navigate = useNavigate()

    const {
        register,
        reset,
        formState: {
            errors
        },
        handleSubmit,
        watch
    } = useForm({
        mode: "onBlur"
    })

    useEffect(() => {
        if(userData.token) {
            window.localStorage.setItem('token', userData.token)
            navigate("/")
        } else if(userData.error) {
            alert(userData.error)
        }
        reset()
    }, [userData])

    const onSubmit = (data) => {
        const user = {
            "username": data.username,
            "email": data.emailAddress,
            "password": data.password
        }
        dispatch(getUserRegistration(user))
    }
    
    return (
        <div  className="register-container">
            <h2 className="register-title">Create new account</h2>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className='wrapper'>
                    <div className="register-input-prompt">Username</div>
                    <input
                        className="register-input"
                        placeholder="Username"
                        {...register('username', {
                            required: "Поле обязательно к заполнению!",
                        })}
                    />
                    <div className='message-error'>{errors?.username && <span>{errors?.username.message}</span>}</div>
                </div>

                <div className='wrapper'>
                    <div className="register-input-prompt">Email address</div>
                    <input
                        className="register-input"
                        placeholder="Email address"
                        {...register('emailAddress', {
                            required: "Поле обязательно к заполнению!",
                        })}
                    />
                    <div className='message-error'>{errors?.emailAddress && <span>{errors?.emailAddress.message}</span>}</div>
                </div>

                <div className='wrapper'>
                    <div className="register-input-prompt">Password</div>
                    <input
                        name="password"
                        className="register-input"
                        type="password"
                        placeholder="Password"
                        {...register('password', {
                            required: "Поле обязательно к заполнению!",
                        })}
                    />
                    <div className='message-error'>{errors?.password && <span>{errors?.password.message}</span>}</div>
                </div>

                <div className='wrapper'>
                    <div className="register-input-prompt">Password</div>
                    <input
                        name="confirmPassword"
                        className="register-input"
                        type="password"
                        placeholder="Password"
                        {...register('confirmPassword', {
                            required: "Поле обязательно к заполнению!",
                            validate: (value) => {
                                if (watch('password') !== value) {
                                    return 'Пароли должны совпадать!'
                                }
                            }
                        })}
                    />
                    <div className='message-error'>{errors?.confirmPassword && <span>{errors?.confirmPassword.message}</span>}</div>
                </div>
                
                <div className='wrapper'>
                    <label className="register-label">
                        <input 
                            type="checkbox" 
                            id="agree" 
                            className="register-checkbox"
                            {...register('agree', {
                                required: "Подтвердите согласие на обработку!",
                            })}/>
                        <span className="checkbox-description">I agree to the processing of my personal information</span>
                    </label>
                    <div className='message-error-checkbox'>{errors?.agree && <span>{errors?.agree.message}</span>}</div>
                </div>

                <button className="register-btn" type="submit">Create</button>
                <div className="register-description">Already have an account? 
                    <Link className="register-sign-up" to="/login"><span> Sign In.</span></Link>
                </div>
            </form>
        </div>
    )
}