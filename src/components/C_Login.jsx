import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import axios from "axios";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const C_Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const configuration = {
            method: "post",
            url: "https://bestbrowsergamesapi--1matzh.repl.co/users/login",
            data: {
                email,
                password
            },
        };

        axios(configuration)
            .then((result) => {
                setLogin(true);
                cookies.set("token", result.data.token, {
                    path: "/",
                });
                window.location.href = "/home";
            })
            .catch((error) => {
                error = new Error();
            });
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            <Form onSubmit={(e) => handleSubmit(e)}>
                {/* email */}
                <Form.Group controlId="formLogin_Email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Insira o seu endereço de email"
                    />
                </Form.Group>

                {/* password */}
                <Form.Group controlId="formLogin_Password">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Insira a sua senha"
                    />
                </Form.Group>

                {/* submit button */}
                <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                >
                    Entrar
                </Button>

                {/* display success message */}
                {login ? (
                    <p className="text-success">Login efetuado com sucesso</p>
                ) : (
                    <p className="text-danger"></p>
                )}

                {/* register link */}
                <p>Não tem uma conta? <a href="/register">Registre-se</a></p>
            </Form>
        </div>
    )
}

export default C_Login
