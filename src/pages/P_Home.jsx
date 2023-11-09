import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Cookies from "universal-cookie";
const cookies = new Cookies();

import AddCategory from "../components/C_AddCategory";


export default function P_Home() {
  // logout
  const logout = () => {
    // destroy the cookie
    cookies.remove("token", { path: "/" });
    // redirect user to the landing page
    window.location.href = "/";
  }

  return (
    <div className="context">
      <AddCategory />

      {/* logout */}
      <Button type="submit" variant="danger" onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
}
