import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

import C_InputField from "../components/C_InputField";
import C_CategoryManager from "../components/C_CategoryManager";

const P_Profile = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const userRoles = cookies.get("token") ? jwtDecode(cookies.get("token")).roles : [];

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
    <div>
      <div className="profile-container">
        <h2>Perfil do Usuário</h2>
        <C_InputField label="Name" value={user.name} onChange={(value) => handleFieldChange("name", value)} />
        <C_InputField label="Email" value={user.email} onChange={(value) => handleFieldChange("email", value)} />
        <C_InputField label="Password" value={user.password} onChange={(value) => handleFieldChange("password", value)} />
        <C_InputField label="Confirm Password" value={user.confirmPassword} onChange={(value) => handleFieldChange("confirmPassword", value)} />
        <C_InputField label="Data de Nascimento" value={user.birthDate} onChange={(value) => handleFieldChange("birthDate", value)} />
        <C_InputField label="País" value={user.country} onChange={(value) => handleFieldChange("country", value)} />
        <C_InputField label="Estado" value={user.state} onChange={(value) => handleFieldChange("state", value)} />

        <button className="btn btn-primary " onClick={handleSaveClick}>Salvar</button>
        <button
          className="btn btn-secondary"
          onClick={() => window.history.back()}>
          Voltar
        </button>

      </div>

        {userRoles.includes("admin") && <C_CategoryManager />}
    </div>
  );
};

export default P_Profile;
