import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import './Header.scss'
import { useDispatch, useSelector } from 'react-redux'
import UserDefaultImage from '../../assets/images/user_default.png'
import { postLogout } from '../../services/authApiService'
import { toast } from 'react-toastify'
import { logout } from '../../redux/action/userAction'

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const account = useSelector(state => state.user.account)
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)

    const handleLogin = () => navigate('/login')
    const handleSignup = () => navigate('/signup')

    const handleLogout = async () => {
        const res = await postLogout(account.email, account.refresh_token)

        if (res && res.EC === 0) {
            dispatch(logout())
            navigate('/')
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Link to="/" className="navbar-brand">QUIZ</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className="nav-link">Home</NavLink>
                        <NavLink to="/quiz" className="nav-link">Quiz</NavLink>
                    </Nav>
                    <Nav>
                        {!isAuthenticated
                            ? (
                                <>
                                    <button className="btn-login me-2" onClick={() => handleLogin()}>Log in</button>
                                    <button className="btn btn-dark" onClick={() => handleSignup()}>Sign up</button>
                                </>
                            )
                            : (
                                <div className="user-information-container">
                                    <div className="user-information-avatar">
                                        <img
                                            src={account.image ? `data:image/jpeg;base64,${account.image}` : UserDefaultImage}
                                            alt=""
                                        />
                                    </div>

                                    <div className="user-dropdown-container">
                                        <div className="user-dropdown-header">
                                            <div>
                                                <div className="user-information-avatar">
                                                    <img
                                                        src={account.image ? `data:image/jpeg;base64,${account.image}` : UserDefaultImage}
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                            <div className="d-flex flex-column">
                                                <span className="user-header-name">
                                                    {account.username ? account.username : account.email}
                                                </span>
                                                <span className="user-header-email">{account.email}</span>
                                            </div>
                                        </div>
                                        <div className="user-dropdown-group">
                                            <div className="group-header">ACCOUNT</div>
                                            <Link to="" className="group-link">Your Account</Link>
                                        </div>
                                        <div className="user-dropdown-group">
                                            <button className="group-link group-logout" onClick={handleLogout}>Log out</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header