import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

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

            
            <Link to="/profile">
            {/* logout */}
            <Button type="submit" variant="danger" onClick={() => logout()}>
                Logout
            </Button>
                <FaUserCircle className="profile-icon" />
            </Link>
        </div>
    );
};

export default Header;
