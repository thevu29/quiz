import { Link } from 'react-router-dom'
import './Footer.scss'
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa6'
import { useSelector } from 'react-redux'

const Footer = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)

    return (
        <>
            <div className="d-flex flex-column align-items-center justify-content-center text-center py-5">
                <h1>Break the norm <br /> of forms</h1>
                <p>Our Free Plan lets you:</p>
                <p>Create unlimited forms <br /> Access 3,000+ templates <br /> Start getting responses</p>
                {isAuthenticated
                    ? <Link to="/quiz" className="btn btn-light">Do quiz now</Link>
                    : <Link to="/signup" className="btn btn-light">Sign up</Link>
                }
            </div>

            <div className="footer-information">
                <div className="container d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <a href="https://www.facebook.com/thevu29/" target="_blank" rel="noreferrer">
                            <FaFacebook />
                            Thế Vũ
                        </a>
                        <a href="https://github.com/thevu29" target="_blank" rel="noreferrer" className="mx-5">
                            <FaGithub />
                            thevu29
                        </a>
                        <a href="https://www.linkedin.com/in/thevu29/" target="_blank" rel="noreferrer">
                            <FaLinkedin />
                            The Vu Nguyen
                        </a>
                    </div>
                    <span>© QUIZ</span>
                </div>
            </div>
        </>
    )
}

export default Footer