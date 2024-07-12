import { Link } from 'react-router-dom'
import { ReactSVG } from 'react-svg'
import './Login.scss'
import GoogleIcon from '../../assets/icons/google.svg'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { useState } from 'react'

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isShowPassword, setIsShowPassword] = useState(false)

    const handleShowHidePassowrd = () => {
        
    }

    const handleLogin = () => {

    }

    return (
        <div className="auth-container">
            <div className="auth-header">
                <span>Don't have an account yet?</span>
                <button className="btn btn-outline-dark">Sign up</button>
            </div>
            <div className="auth-content">
                <div className="auth-title">
                    <Link to="/">QUIZ</Link>
                    <h2>Hello, who’s this?</h2>
                </div>
                <form className="auth-form">
                    <div className="form-group">
                        <div className="form-label">
                            <label>Email</label>
                        </div>
                        <div className="form-input-container">
                            <input
                                type="email"
                                className="form-input"
                                placeholder="ngthevu@gmail.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-label">
                            <label>Password</label>
                        </div>
                        <div className="form-input-container">
                            <input
                                type="password"
                                className="form-input"
                                placeholder="At least 8 characters"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <span className="password-toggle">
                                <span className="passowrd-toggle-icon" onClick={e => handleShowHidePassowrd()}>
                                    <FaRegEye color="#D2D2D2" cursor='pointer' />
                                    {/* <FaRegEyeSlash color="#D2D2D2" cursor='pointer' /> */}
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="mb-4">
                        <Link to="" className="auth-forget-password">Forgot password?</Link>
                    </div>
                    <div className="mb-4">
                        <button
                            className="btn btn-dark w-100 btn-login"
                            onClick={() => handleLogin()}
                        >
                            Log in to QUIZ
                        </button>
                    </div>
                </form>
                <div className="auth-google-container">
                    <div className="auth-divider">
                        <span className="auth-divider-text">OR</span>
                    </div>
                    <div className="w-100">
                        <button className="auth-login-button">
                            <ReactSVG src={GoogleIcon} className="auth-google-icon" />
                            Log in with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login