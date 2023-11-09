import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import axios from "axios";


const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");

    const [register, setRegister] = useState(false);

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();

        // set configurations
        const configuration = {
            method: "post",
            url: "https://bestbrowsergamesapi--1matzh.repl.co/users",
            data: {
                name,
                email,
                password,
                confirmPassword,
                birthDate,
                country,
                state
            },
        };
        // make the API call
        axios(configuration)
            .then(() => {
                setRegister(true);
            })
            .catch((error) => {
                error = new Error();
            });
        }

    return (
        <>
            <h2>Register</h2>
            {/* password */}
            <Form.Group controlId="formRegister_Name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                    />
                </Form.Group>

            <Form onSubmit={(e) => handleSubmit(e)}>
                {/* email */}
                <Form.Group controlId="formRegister_Email">
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
                <Form.Group controlId="formRegister_Password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </Form.Group>

                {/* confirm-password */}
                <Form.Group controlId="formRegister_ConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                    />
                </Form.Group>

                {/* confirm-password */}
                <Form.Group controlId="formRegister_BirthDate">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                        type="date"
                        name="birthDate"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        placeholder="Enter your date of birth"
                    />
                </Form.Group>

                {/* country */}
                <Form.Group controlId="formRegister_Country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="country"
                        name="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Enter your country"
                    />
                </Form.Group>

                {/* state */}
                <Form.Group controlId="formRegister_State">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                        type="state"
                        name="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="Enter your state"
                    />
                </Form.Group>

                {/* submit button */}
                <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                >
                    Register
                </Button>

                {/* display success message */}
                {register ? (
                    <p className="text-success">You Are Registered Successfully</p>
                ) : (
                    <p className="text-danger">You Are Not Registered</p>
                )}

                {/* login link */}
                <p>Already have an account? <a href="/">Login</a></p>
            </Form>
        </>
    )
}

export default Register

