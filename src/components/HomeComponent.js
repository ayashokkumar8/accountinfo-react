import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BsArrowBarUp } from "react-icons/bs";


export default function HomeComponent() {
    return (
        <div>
            <Container style={{marginTop: '40px'}}>
                <Row>
                    <Col xs={12} md={6}>
                        <Container style={{textAlign: 'left'}}>
                            <h1 style={{fontSize: '50px', fontWeight: 'bold' }}>Import your transactions file with a few clicks</h1>
                            <p style={{ fontSize: '20px', opacity: '0.6', marginTop: '20px'}}>Upload is made easy for you</p>
                            <Button style={{width: '13rem', height: '3.5rem', marginTop: '20px', fontSize: '20px', fontWeight: 'bold', borderRadius: '25px', backgroundColor: ' #ff9933',  outline: 'none', border: '1px solid #fff'}}><BsArrowBarUp style={{fontSize: '25px', marginRight: '15px'}}/> IMPORT</Button>
                        </Container>
                    </Col>
                    <Col xs={12} md={6}>
                        <img alt=""  src="illustration.png"  />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
