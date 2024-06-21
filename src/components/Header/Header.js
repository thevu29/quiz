import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Link to='/' className='navbar-brand'>Quiz</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to='/' className='nav-link'>Trang chủ</Link>
                        <Link to='/user' className='nav-link'>User</Link>
                        <Link to='/admin' className='nav-link'>Admin</Link>
                    </Nav>
                    <Nav>
                        <NavDropdown title="Tài khoản" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Thông tin tài khoản</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1">Đăng nhập</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1">Đăng xuất</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header