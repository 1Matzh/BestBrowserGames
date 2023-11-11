// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import P_Login from "./pages/P_Login";
import P_Register from "./pages/P_Register";
import P_Home from "./pages/P_Home";
import P_GamePage from "./pages/P_GamePage";
import P_Profile from "./pages/P_Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<P_Login />} />
      <Route path="/register" element={<P_Register />} />
      <Route path="/home" element={<P_Home />} />
      <Route path="/profile" element={<P_Profile />} />
      <Route path="/games/:gameId" element={<P_GamePage />} />
    </Routes>
  );
}

export default App;
