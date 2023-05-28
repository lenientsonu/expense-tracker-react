import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Header from "../Layout/Header";

import "./Welcome.css";

const WelcomePage = () => {
    return (
        <>
            <header>
                <Header />
            </header>
            <main>
                <Container className='welcome'>
                    <Row>
                        <Col>
                            <div className='content'>
                                <p>Welcome To Expense Tracker !!!</p>
                                <span>
                                    Your Profile is Incomplete.
                                    <Link to='/profile'>Complete Now</Link>
                                </span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </main>
        </>
    );
};

export default WelcomePage;
