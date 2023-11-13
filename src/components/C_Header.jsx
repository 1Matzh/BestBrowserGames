import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Cookies from "universal-cookie";

import C_SearchBar from "./C_SearchBar";

const cookies = new Cookies();

const C_Header = () => {
    const logout = () => {
        cookies.remove("token", { path: "/" });
        window.location.href = "/";
    }

    return (
        <div className="header">
            <Link to="/home" style={{ textDecoration: 'none', color: 'white' }}>
                <h1>BestBrowserGames</h1>
            </Link>

            <div>
                <C_SearchBar />
            </div>

            <div className="header-right">
                {/* logout */}
                <Button type="submit" variant="danger" onClick={() => logout()}>
                    Logout
                </Button>

                <Link to="/profile">
                    <FaUserCircle className="profile-icon" />
                </Link>
            </div>
        </div>
    );
};

export default C_Header;
