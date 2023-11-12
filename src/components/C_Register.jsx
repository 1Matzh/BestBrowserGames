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
        <div className="register-container">
            <h2>Registre-se</h2>
            {/* password */}
            <Form.Group controlId="formRegister_Name">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Insira o seu nome"
                    />
                </Form.Group>

            <Form onSubmit={(e) => handleSubmit(e)}>
                {/* email */}
                <Form.Group controlId="formRegister_Email">
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
                <Form.Group controlId="formRegister_Password">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Insira a sua senha"
                    />
                </Form.Group>

                {/* confirm-password */}
                <Form.Group controlId="formRegister_ConfirmPassword">
                    <Form.Label>Confirme sua senha</Form.Label>
                    <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Insira a sua senha novamente"
                    />
                </Form.Group>

                {/* confirm-password */}
                <Form.Group controlId="formRegister_BirthDate">
                    <Form.Label>Data de nascimento</Form.Label>
                    <Form.Control
                        type="date"
                        name="birthDate"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        placeholder="Insira a sua data de nascimento"
                    />
                </Form.Group>

                {/* country */}
                <Form.Group controlId="formRegister_Country">
                    <Form.Label>País</Form.Label>
                    <Form.Control
                        type="text"
                        name="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Insira o seu país"
                    />
                </Form.Group>

                {/* state */}
                <Form.Group controlId="formRegister_State">
                    <Form.Label>Estado</Form.Label>
                    <Form.Control
                        type="text"
                        name="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="Insira o seu estado"
                    />
                </Form.Group>

                {/* submit button */}
                <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                >
                    Registre-se
                </Button>

                {/* display success message */}
                {register ? (
                    <p className="text-success">Você foi registrado com sucesso</p>
                ) : (
                    <p className="text-danger"></p>
                )}

                {/* login link */}
                <p>Ja tem uma conta? <a href="/">Login</a></p>
            </Form>
        </div>
    )
}

export default Register

