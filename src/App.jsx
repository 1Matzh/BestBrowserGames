import React from "react";
import { Routes, Route } from "react-router-dom";

import P_Login from "./pages/P_Login";
import P_Register from "./pages/P_Register";
import P_Games from "./pages/P_Games";


function App() {
  return (
    <Routes>
      <Route path="/login" element={<P_Login />} />
      <Route path="/register" element={<P_Register />} />
      <Route path="/games" element={<P_Games />} />
    </Routes>
  );
};

export default App;