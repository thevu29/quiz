import SignupImage from '../../assets/images/signup.webp'
import './Signup.scss'
import GoogleIcon from '../../assets/icons/google.svg'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { MdOutlineWarningAmber } from 'react-icons/md'
import { ReactSVG } from 'react-svg'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isValidEmail } from '../../validation/Validate'

const Signup = (props) => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [policy, setPolicy] = useState(false)
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [validateEmail, setValidateEmail] = useState({ text: '', isValid: true })
    const [validatePassword, setValidatePassword] = useState({ text: '', isValid: true })
    const [validatePolicy, setValidatePolicy] = useState({ text: '', isValid: true })

    useEffect(() => {
        document.title = 'Sign up | QUIZ'
    }, [])

    const validation = () => {
        let valid = true

        if (!email) {
            setValidateEmail({ text: 'Please enter your email address', isValid: false })
            valid = false
        }
        if (!password) {
            setValidatePassword({ text: 'Please enter your password', isValid: false })
            valid = false
        }
        if (!policy) {
            setValidatePolicy({ text: 'Please accept the policies', isValid: false })
            valid = false
        }
        if (email && !isValidEmail(email)) {
            setValidateEmail({ text: 'Please enter a valid email address', isValid: false })
            valid = false
        }

        return valid
    }

    const handleSignup = e => {
        e.preventDefault()

        if (!validation()) return
    }

    const handleLogin = () => navigate('/login')

    return (
        <div className="signup-container">
            <div className="signup-page">
                <div className="signup-left">
                    <h1 className="signup-left-header">Sign up <br /> and come on in</h1>
                    <img src={SignupImage} alt="" />
                    <p className="signup-copyright">© QUIZ</p>
                </div>
                <div className="signup-right">
                    <div className="signup-right-header">
                        <span>Already have an account?</span>
                        <button className="btn btn-outline-dark" onClick={() => handleLogin()}>Log in</button>
                    </div>
                    <div className="signup-right-content">
                        <h2 className="content-header">
                            <Link to="/">QUIZ</Link>
                        </h2>
                        <p className="content-title">Get better data with conversational forms, surveys, quizzes & more.</p>
                        <form className="auth-form">
                            <div className="form-group">
                                <div className="form-input-container">
                                    <input
                                        type="email"
                                        className="form-input"
                                        placeholder="Email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    {validateEmail && !validateEmail.isValid && (
                                        <span className="form-input-error">
                                            <MdOutlineWarningAmber />
                                            {validateEmail.text}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-input-container">
                                    <input
                                        type={isShowPassword ? 'text' : 'password'}
                                        className="form-input"
                                        placeholder="Password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                    <span className="password-toggle">
                                        <span className="passowrd-toggle-icon" onClick={() => setIsShowPassword(!isShowPassword)}>
                                            {isShowPassword
                                                ? <FaRegEyeSlash color="#D2D2D2" cursor='pointer' />
                                                : <FaRegEye color="#D2D2D2" cursor='pointer' />
                                            }
                                        </span>
                                    </span>
                                    {validatePassword && !validatePassword.isValid && (
                                        <span className="form-input-error">
                                            <MdOutlineWarningAmber />
                                            {validatePassword.text}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-input-container">
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Username"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-group mt-4">
                                <div className="form-input-container">
                                    <label htmlFor="signup-policy" className="signup-policy-check">
                                        <input
                                            type="checkbox"
                                            id="signup-policy"
                                            checked={policy}
                                            onChange={() => setPolicy(!policy)}
                                        />
                                        I agree to QUIZ’s Terms of Service, Privacy Policy and Data Processing Agreement.
                                    </label>
                                    {validatePolicy && !validatePolicy.isValid && (
                                        <span className="form-input-error">
                                            <MdOutlineWarningAmber />
                                            {validatePolicy.text}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="mb-4">
                                <button
                                    className="btn btn-dark w-100"
                                    onClick={e => handleSignup(e)}
                                >
                                    Create account
                                </button>
                            </div>
                        </form>
                        <div className="auth-google-container">
                            <div className="auth-divider">
                                <span className="auth-divider-text">OR</span>
                            </div>
                            <div className="w-100">
                                <button className="auth-button">
                                    <ReactSVG src={GoogleIcon} className="auth-google-icon" />
                                    Sign up with Google
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup