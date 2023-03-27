import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { getUserAuthorization } from '../../redux/features/AuthUserSlice'

import './LoginPage.css'

export const LoginPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector(state => state.user)

    const {
        register,
        reset,
        formState: {
            errors
        },
        handleSubmit
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
            "email": data.emailAddress,
            "password": data.password
        }
        dispatch(getUserAuthorization(user))
    }

    return (
        <div  className="login-container">
            <h2 className="login-title">Sign In</h2>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className='wrapper'>
                    <div className="login-input-prompt">Email address</div>
                    <input
                        className="login-input"
                        placeholder="Email address"
                        {...register('emailAddress', {
                            required: "Поле обязательно к заполнению!",
                        })}
                    />
                    <div className='message-error'>
                        {errors?.emailAddress && <span>{errors?.emailAddress.message}</span>}
                    </div>
                </div>

                <div className='wrapper'>
                    <div className="login-input-prompt">Password</div>
                    <input
                        className="login-input"
                        placeholder="Password"
                        type="password"
                        {...register('password', {
                            required: "Поле обязательно к заполнению!",
                        })}
                    />
                    <div className='message-error'>
                        {errors?.password && <span>{errors?.password.message}</span>}
                    </div>
                </div>

                <button className="login-btn" type="submit">Login</button>
                <div className="login-description">Don't have an account? 
                    <Link className="login-sign-up" to="/create-account"><span> Sign Up.</span></Link>
                </div>

            </form>
        </div>
    )
}