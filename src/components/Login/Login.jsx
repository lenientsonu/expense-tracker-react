import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { Client, Account } from "appwrite";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import "./Login.css";

const Login = (props) => {
    const emailRef = useRef();
    const passRef = useRef();
    const history = useHistory();

    const client = new Client()
        .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
        .setProject("64644013b01d7dac4717"); // Your project ID

    const account = new Account(client);

    const authenticate = async (email, password) => {
        const promise = account.createEmailSession(email, password);
        promise.then(
            function (response) {
                console.log(response);
                history.replace("/home");
            },
            function (error) {
                alert(error);
            }
        );

        //checking login(session stored in the localstorage)
        // const check = account.get();
        // check.then(function (response) {
        //     console.log(response.email);
        // });
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
            </Form>
            <h3>
                Don't have a Account?
                <a href='/signup'> Sign Up</a>
            </h3>
        </>
    );
};

export default Login;
