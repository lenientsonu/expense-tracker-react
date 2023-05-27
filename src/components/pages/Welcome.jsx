import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
                        <Link to='/profile'> Complete Now</Link>
                    </span>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Logout />
                </Col>
            </Row>
            <Col>
                <Link className='home-btn' to='/home'>
                    Go to Expense Tracker
                </Link>
            </Col>
        </Container>
    );
};

export default WelcomePage;
