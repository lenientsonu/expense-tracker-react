import React, { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import "./SignUp.css";

const SignUp = (props) => {
    const history = useHistory();
    const emailRef = useRef();
    const passRef = useRef();
    const cnfrmPassRef = useRef();

    //auth for firebase
    const saveToServer = async (email, password) => {
        try {
            const response = await axios.post(
                "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmaC9PUexvjOMQr2wvhteHn23kFPTmuj0",
                {
                    email: email,
                    password: password,
                    returnSecureToken: true,
                }
            );
            console.log(response.data);
            alert("User has successfully signed up");
            history.replace("/login");
        } catch (error) {
            // alert(error.message);
            alert("Something Went Wrong");
        }
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const emailValue = emailRef.current.value;
        const passValue = passRef.current.value;
        const cnfrmPassValue = cnfrmPassRef.current.value;

        // validation
        if (!emailValue || !passValue || !cnfrmPassValue) {
            alert("Enter All The Fields for Signing Up !!");
        } else {
            if (passValue !== cnfrmPassValue) {
                alert("Passwords Do Not Match !!");
            } else {
                saveToServer(emailValue, passValue);
            }
        }
    };

    return (
        <>
            <Form className='form' onSubmit={submitHandler}>
                <h2>Sign Up</h2>
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
                <FloatingLabel controlId='floatingConfirmPassword' label=''>
                    <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        ref={cnfrmPassRef}
                    />
                </FloatingLabel>
                <Button variant='primary' type='submit'>
                    Sign Up
                </Button>
            </Form>
            <h3>
                Have an Account?
                <a href='/login'> Login</a>
            </h3>
        </>
    );
};

export default SignUp;
