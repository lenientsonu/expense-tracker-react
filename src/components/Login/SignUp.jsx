import React, { useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import Notification from "../UI/Notification";
import { uiActions } from "../../store/uiSlice";

import "./SignUp.css";

const SignUp = (props) => {
    const dispatch = useDispatch();
    const emailRef = useRef();
    const passRef = useRef();
    const cnfrmPassRef = useRef();
    const notification = useSelector((state) => state.ui.notification);

    //auth for firebase
    const saveToServer = async (email, password) => {
        try {
            dispatch(
                uiActions.showNotification({
                    status: "pending",
                    title: "Pending",
                    message: "Creating your account",
                })
            );
            const response = await axios.post(
                "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmaC9PUexvjOMQr2wvhteHn23kFPTmuj0",
                {
                    email: email,
                    password: password,
                    returnSecureToken: true,
                }
            );
            console.log(response.data);
            dispatch(
                uiActions.showNotification({
                    status: "success",
                    title: "Success!",
                    message: "Created your account successfully",
                })
            );
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: "error",
                    title: "Error!",
                    message: error.response.data.error.message,
                })
            );
        } finally {
            setTimeout(() => {
                dispatch(uiActions.hideNotification());
            }, 2000);
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
            {notification && (
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )}
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
                <Button type='submit' disabled={notification}>
                    {notification ? "Loading" : "Sign Up"}
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
