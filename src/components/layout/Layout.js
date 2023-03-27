import { useState, useEffect } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setUserAutorization } from "../../redux/features/AuthUserSlice"

import './Layout.css'

export const Layout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuth = Boolean(window.localStorage.getItem('token'))

    
    const name = useSelector(state => state.user.username)
    const image = useSelector(state => state.user.image)
    
    const [userName, setUserName] = useState(name)
    const [userImage, setUserImage] = useState(image)

    useEffect(() => {
			setUserName(name)
			setUserImage(image)
    }, [name, image])
        
    const onClickLogout = () => {
			const noneUser = {
				username: '',
				email: '',
				token: '',
				image: '',
				isLoaded: false,
				error: ''
			}

			if (window.confirm('Are you sure you want to log out?')) {
					window.localStorage.removeItem('token')
					dispatch(setUserAutorization(noneUser))
					navigate("/")
				}
			}

    return (
			<>
				<header className="header">
					<Link to="/"><button className="header__title">Realworld Blog</button></Link>

					{isAuth ? (
						<div className="user-is-auth">
							<Link to="/create-article">
								<button className="btn-create-article">Create article</button>
							</Link>
							<Link to="/edit-account" className="author">
								<span className="user-name">{userName}</span>
								<img className="user-icon" src={userImage} alt="user"/>
							</Link>
							<button onClick={onClickLogout} className="btn-log-out">Log Out</button>
						</div>
					) : (
						<div>
							<Link to="/login"><button className="header__btn header__btn-in">Sign In</button></Link>
							<Link to="/create-account"><button className="header__btn header__btn-up">Sign Up</button></Link>
						</div>
					)}
				</header>

				<Outlet />
			</>
    )
}