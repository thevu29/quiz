import './HomePage.scss'
import videoHomepage from '../../assets/videos/homepage.webm'
import videoHomepage2 from '../../assets/videos/homepage2.webm'
import videoHomepage3 from '../../assets/videos/homepage3.webm'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const HomePage = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)

    return (
        <div className='homepage-container'>
            <Container>
                <Row className="homepage-box">
                    <Col>
                        <video width='100%' autoPlay loop muted className=''>
                            <source src={videoHomepage} type='video/webm' />
                        </video>
                    </Col>
                    <Col>
                        <div className='homepage-content'>
                            <h1>Make forms <br></br> worth filling out</h1>
                            <p>
                                <span>
                                    Get more data—like signups, feedback, and anything else—with forms designed to be
                                    <strong> refreshingly different.</strong>
                                </span>
                            </p>
                            {isAuthenticated
                                ? <Link to='/user' className='btn btn-dark'>Let's do quiz</Link>
                                : <Link to='/signup' className='btn btn-dark'>Get started—it's free</Link>
                            }
                        </div>
                    </Col>
                </Row>
                <div className="mb-5 text-center">
                    <h1 className="display-3">Refreshingly different, <br /> by design</h1>
                </div>
                <Row className="homepage-box mt-5">
                    <Col>
                        <div className='homepage-content'>
                            <h1>Looks striking. Feels effortless.</h1>
                            <p>
                                <span>
                                    <strong>Impress your form takers.</strong>
                                    Catch their eye with striking visuals,
                                    and make form-filling feel effortless by replacing walls of questions with just one at a time.
                                </span>
                            </p>
                            {isAuthenticated
                                ? <Link to='/user' className='btn btn-dark'>Do quiz now</Link>
                                : <Link to='/signup' className='btn btn-dark'>Sign up</Link>
                            }
                        </div>
                    </Col>
                    <Col>
                        <video width='100%' autoPlay loop muted className=''>
                            <source src={videoHomepage2} type='video/webm' />
                        </video>
                    </Col>
                </Row>
                <Row className="homepage-box mt-5">
                    <Col>
                        <video width='100%' autoPlay loop muted className=''>
                            <source src={videoHomepage3} type='video/webm' />
                        </video>
                    </Col>
                    <Col className="ms-5">
                        <div className='homepage-content'>
                            <h1>Embeds smoothly. <br /> Reveals more.</h1>
                            <p>
                                <span>
                                    <strong>Collect more and better data.</strong>
                                    Embed forms where people see them, from web to email.
                                    Ask the right follow-up question at the right time to reveal deeper insights.
                                </span>
                            </p>
                            {isAuthenticated
                                ? <Link to='/user' className='btn btn-dark'>Do quiz now</Link>
                                : <Link to='/signup' className='btn btn-dark'>Sign up</Link>
                            }
                        </div>
                    </Col>
                </Row>
                <div className="text-center">
                    <h1 style={{ fontSize: '48px' }}>Why QUIZ?</h1>
                    <p>Because after switching to us...</p>
                </div>
            </Container>
            <div className="homepage-information">
                <div className="d-flex flex-column align-items-center">
                    <span>96%</span>
                    <span>of customers say they have a better brand experience</span>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <span>95%</span>
                    <span>of customers say they gather more data, more easily</span>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <span>87%</span>
                    <span>of customers say they reveal deeper insights from data</span>
                </div>
            </div>
        </div>
    )
}

export default HomePage