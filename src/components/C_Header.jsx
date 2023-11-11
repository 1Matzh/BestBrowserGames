import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Header = () => {
    const logout = () => {
        // destroy the cookie
        cookies.remove("token", { path: "/" });
        // redirect user to the landing page
        window.location.href = "/";
    }

    return (
        <div className="header">
            <h1>BestBrowserGames</h1>

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

export default Header;
