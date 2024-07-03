import videoHomepage from '../../assets/videos/homepage.webm'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <div className='homepage-container'>
            <Container>
                <Row>
                    <Col>
                        <video width='100%' autoPlay loop muted className=''>
                            <source src={videoHomepage} type='video/webm' />
                        </video>
                    </Col>
                    <Col>
                        <div className='homepage-content'>
                            <h1>Make forms worth filling out</h1>
                            <p>
                                <span>Get more data—like signups, feedback, and anything else—with forms designed to be
                                    <strong> refreshingly different.</strong>
                                </span>
                            </p>
                            <Link to='' className='btn btn-dark btn-signup'>Get started—it's free</Link>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div style={{height: '500px'}}>

            </div>
        </div>
    )
}

export default HomePage