import React, { useRef } from "react";
import { Client, Account, ID } from "appwrite";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import "./SignUp.css";

const SignUp = (props) => {
    const emailRef = useRef();
    const passRef = useRef();
    const cnfrmPassRef = useRef();

    const client = new Client()
        .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
        .setProject("64644013b01d7dac4717"); // Your project ID

    const account = new Account(client);

    const saveToServer = async (email, password) => {
        const promise = account.create(ID.unique(), email, password);

        promise.then(
            function (response) {
                console.log(response);
                console.log("User has successfully signed up");
            },
            function (error) {
                console.log(error);
            }
        );
    };

    const submitHandler = async (event) => {
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
                // console.log(emailValue, passValue, cnfrmPassValue);
                saveToServer(emailValue, passValue);
            }
        }
    };

    return (
        <Form className='form' onSubmit={submitHandler}>
            <h2>Sign Up</h2>
            <FloatingLabel controlId='floatingInput' label='' className='mb-3'>
                <Form.Control type='email' placeholder='Email' ref={emailRef} />
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
    );
};

export default SignUp;
