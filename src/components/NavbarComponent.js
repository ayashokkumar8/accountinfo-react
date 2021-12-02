import React from 'react'
import { Nav, Navbar, Container, Button } from 'react-bootstrap';
import './styles.css';



export default function NavbarComponent() {
    return (
        <div>
            <Navbar expand="lg" >
                    <Container>
                        <Navbar.Brand href="#home"><img alt="" src="./logo.svg"  /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto" >
                                <Nav.Link href="#home">ACCOUNTS AND CARDS</Nav.Link>
                                <Nav.Link href="#link">LOANS AND MORTGAGES</Nav.Link>
                                <Nav.Link href="#link">CONSULTING</Nav.Link>
                                <Nav.Link href="#link">TRADING</Nav.Link>
                                <Nav.Link href="#link"></Nav.Link>
                                <Button>Login</Button>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar> 
        </div>
    )
}
