import React, { useRef, useContext, useEffect, useCallback } from "react";
import axios from "axios";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import AuthContext from "../store/auth-context";
import Logout from "../Login/Logout";

import "./Profile.css";

const ProfilePage = () => {
    const nameRef = useRef();
    const photoUrlRef = useRef();
    const authCtx = useContext(AuthContext);

    const getProfile = useCallback(async () => {
        try {
            //getting user profile details from firebase server
            const response = await axios.post(
                "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDmaC9PUexvjOMQr2wvhteHn23kFPTmuj0",
                {
                    idToken: authCtx.userToken,
                }
            );
            console.log(
                response.data.users[0].displayName,
                response.data.users[0].photoUrl,
                response.data.users[0].emailVerified
            );
            //pre filling the user details
            if (
                response.data.users[0].displayName &&
                response.data.users[0].photoUrl
            ) {
                nameRef.current.value = response.data.users[0].displayName;
                photoUrlRef.current.value = response.data.users[0].photoUrl;
            }
            //setting isEmailVerified in local storage
            localStorage.setItem(
                "isEmailVerified",
                response.data.users[0].emailVerified
            );
        } catch (error) {
            console.log(error);
        }
    }, [authCtx.userToken]);

    useEffect(() => {
        getProfile();
    }, [getProfile]);

    const updateProfile = async (name, photo) => {
        try {
            const response = await axios.post(
                "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDmaC9PUexvjOMQr2wvhteHn23kFPTmuj0",
                {
                    idToken: authCtx.userToken,
                    displayName: name,
                    photoUrl: photo,
                }
            );
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const clickHandler = (event) => {
        event.preventDefault();
        const nameValue = nameRef.current.value;
        const photoUrlValue = photoUrlRef.current.value;

        updateProfile(nameValue, photoUrlValue);
    };

    const verifyEmailHandler = async (event) => {
        try {
            event.preventDefault();
            const response = await axios.post(
                "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDmaC9PUexvjOMQr2wvhteHn23kFPTmuj0",
                {
                    requestType: "VERIFY_EMAIL",
                    idToken: authCtx.userToken,
                }
            );
            console.log(response.data);
            console.log("User Email Verified");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='profile'>
            <p>Winners Never Quit, Quitters Never Win.</p>
            <Logout />
            <hr />
            <Form>
                <h3>User Details</h3>
                <p>
                    Email: {authCtx.email}
                    <Button onClick={verifyEmailHandler}>Verify Email</Button>
                </p>
                <Row>
                    <Col>
                        <Form.Label>Full Name:</Form.Label>
                        <Form.Control placeholder='' ref={nameRef} />
                        <Form.Label>Profile Photo URL:</Form.Label>
                        <Form.Control placeholder='' ref={photoUrlRef} />
                    </Col>
                    <Col>
                        <Button type='submit' onClick={clickHandler}>
                            Update
                        </Button>
                        <Button type='submit'>Cancel</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default ProfilePage;
