import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

import InputField from "../components/C_InputField";

const P_Profile = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");

  const [user, setUser] = useState({
    _id: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    country: "",
    state: "",
  });

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);

      setUser({
        _id: decodedToken.id,
        name: decodedToken.name,
        email: decodedToken.email,
        password: "***",
        confirmPassword: "***",
        birthDate: decodedToken.birthDate,
        country: decodedToken.country,
        state: decodedToken.state,
      });
    }
  }, [token]);

  const handleFieldChange = (fieldName, fieldValue) => {
    setUser((prevUser) => ({
      ...prevUser,
      [fieldName]: fieldValue,
    }));
  };

  const handleSaveClick = () => {
    axios.put(`https://bestbrowsergamesapi--1matzh.repl.co/users/${user._id}`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        console.log("User details saved successfully:", response.data);
      })
      .catch(error => {
        console.error("Error saving user details:", error.response.data);
      });
  };

  return (
    <div className="profile-container">
      <h2>Perfil do Usuário</h2>
      <InputField label="Name" value={user.name} onChange={(value) => handleFieldChange("name", value)} />
      <InputField label="Email" value={user.email} onChange={(value) => handleFieldChange("email", value)} />
      <InputField label="Password" value={user.password} onChange={(value) => handleFieldChange("password", value)} />
      <InputField label="Confirm Password" value={user.confirmPassword} onChange={(value) => handleFieldChange("confirmPassword", value)} />
      <InputField label="Data de Nascimento" value={user.birthDate} onChange={(value) => handleFieldChange("birthDate", value)} />
      <InputField label="País" value={user.country} onChange={(value) => handleFieldChange("country", value)} />
      <InputField label="Estado" value={user.state} onChange={(value) => handleFieldChange("state", value)} />

      <button className="btn btn-primary " onClick={handleSaveClick}>Salvar</button>
      <button
        className="btn btn-secondary"
        onClick={() => window.history.back()}>
        Voltar
      </button>
    </div>
  );
};

export default P_Profile;
