import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import { Link } from "react-router-dom";
import Logout from "../Login/Logout";

import "./Welcome.css";

const WelcomePage = () => {
    return (
        <Container className='welcome'>
            <Row>
                <Col>
                    <p>Welcome To Expense Tracker !!!</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <span>
                        Your Profile is Incomplete.
                        <a href='/profile'> Complete Now</a>
                    </span>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Logout />
                </Col>
            </Row>
        </Container>
    );
};

export default WelcomePage;
