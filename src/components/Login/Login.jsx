import { useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import "./Login.css";

const Login = (props) => {
    const emailRef = useRef();
    const passRef = useRef();
    const history = useHistory();
    const dispatch = useDispatch();

    //firebase auth
    const authenticate = async (email, password) => {
        try {
            const response = await axios.post(
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmaC9PUexvjOMQr2wvhteHn23kFPTmuj0",
                {
                    email: email,
                    password: password,
                    returnSecureToken: true,
                }
            );
            console.log(response.data);
            dispatch(
                authActions.login({
                    token: response.data.idToken,
                    email: email,
                })
            );
            history.replace("/welcome");
        } catch (error) {
            alert(error.response.data.error.message);
        }
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const emailValue = emailRef.current.value;
        const passValue = passRef.current.value;

        // validation
        if (!emailValue || !passValue) {
            alert("Enter All The Fields !!");
        } else {
            authenticate(emailValue, passValue);
        }
    };

    const forgotHandler = (event) => {
        event.preventDefault();
        history.replace("/forgot");
    };

    return (
        <>
            <Form className='form' onSubmit={submitHandler}>
                <h2>Log In</h2>
                <FloatingLabel
                    controlId='floatingInput'
                    label=''
                    className='mb-3'
                >
                    <Form.Control
                        type='email'
                        placeholder='Email'
                        ref={emailRef}
                    />
                </FloatingLabel>
                <FloatingLabel controlId='floatingPassword' label=''>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        ref={passRef}
                    />
                </FloatingLabel>

                <Button variant='primary' type='submit'>
                    Login
                </Button>
                <br />
                <Button className='forgot-btn' onClick={forgotHandler}>
                    Forgot password?
                </Button>
            </Form>

            <h3>
                Don't have a Account?
                <a href='/signup'> Sign Up</a>
            </h3>
        </>
    );
};

export default Login;
