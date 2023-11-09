import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import axios from "axios";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();

        // set configurations
        const configuration = {
            method: "post",
            url: "https://bestbrowsergamesapi--1matzh.repl.co/users/login",
            data: {
                email,
                password
            },
        };
        // make the API call
        axios(configuration)
            .then((result) => {
                setLogin(true);
                // set the cookie
                cookies.set("token", result.data.token, {
                    path: "/",
                });
                // redirect user to the auth page
                window.location.href = "/home";
            })
            .catch((error) => {
                error = new Error();
            });
    }

    return (
        <>
            <h2>Login</h2>
            <Form onSubmit={(e) => handleSubmit(e)}>
                {/* email */}
                <Form.Group controlId="formLogin_Email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                    />
                </Form.Group>

                {/* password */}
                <Form.Group controlId="formLogin_Password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </Form.Group>

                {/* submit button */}
                <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                >
                    Login
                </Button>

                {/* display success message */}
                {login ? (
                    <p className="text-success">You Are Logged in Successfully</p>
                ) : (
                    <p className="text-danger">You Are Not Logged in</p>
                )}

                {/* register link */}
                <p>Don't have an account? <a href="/register">Register</a></p>
            </Form>
        </>
    )
}

export default Login
