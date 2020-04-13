import React from "react";
import registrationImage from './img/registration.svg';
import { Container, Row, Col } from "react-bootstrap";
import './index.scss';

export default ({children}) => (
    <div className="registration">
        <Container>
            <Row>
                <Col xs={12} lg={6}>
                    {children}
                </Col>
                <Col xs={12} lg={6}>
                    <div className="registration-bg">
                        <img src={registrationImage} alt="Shosho" className="registration-bg__img" />
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
)
