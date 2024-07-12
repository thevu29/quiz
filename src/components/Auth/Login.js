import { Link } from 'react-router-dom'
import { ReactSVG } from 'react-svg'
import './Login.scss'
import GoogleIcon from '../../assets/icons/google.svg'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { MdOutlineWarningAmber } from 'react-icons/md'
import { useEffect, useState } from 'react'
import { postLogin } from '../../services/authApiService'
import { toast } from 'react-toastify'

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [validateEmail, setValidateEmail] = useState({ text: '', isValid: true })
    const [validatePassword, setValidatePassword] = useState({ text: '', isValid: true })

    useEffect(() => {
        document.title = 'Log in | QUIZ'
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

        return valid
    }

    const resetForm = () => {
        setEmail('')
        setPassword('')
    }

    const handleLogin = async e => {
        e.preventDefault()

        if (!validation()) return
        
        const res = await postLogin(email, password)
        
        if (res && res.EC === 0) {
            toast.success('Login successfully')
            resetForm()
        } else {
            toast.error(res.EM)
        }

        setValidateEmail({ text: '', isValid: true })
        setValidatePassword({ text: '', isValid: true })
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
                            {validateEmail && !validateEmail.isValid && (
                                <span className="form-input-error">
                                    <MdOutlineWarningAmber />
                                    Please enter your email address
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-label">
                            <label>Password</label>
                        </div>
                        <div className="form-input-container">
                            <input
                                type={isShowPassword ? 'text' : 'password'}
                                className="form-input"
                                placeholder="At least 8 characters"
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
                                    Please enter your password
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="mb-4">
                        <Link to="" className="auth-forget-password">Forgot password?</Link>
                    </div>
                    <div className="mb-4">
                        <button
                            className="btn btn-dark w-100 btn-login"
                            onClick={e => handleLogin(e)}
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