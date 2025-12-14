import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { getUser, logout } from "../utils/auth";
import UserEdit from "./UserEdit";

const Layout = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [user, setUser] = useState(getUser());

  const navigate = useNavigate();

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const toggleProfile = () => setShowProfile(!showProfile);

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <nav className="nav_bar">
        <h1 className="logo">
          Wan<span className="app_name">der</span> E
          <span className="app_name">ase</span>
        </h1>

        <ul className={`nav_links ${isNavOpen ? "active" : ""}`}>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/package">Packages</Link></li>

          <li className="nav-item dropdown">
            <span>Activities</span>
            <ul className="dropdown-menu">
              <li><Link to="/activities/hiking">Hiking</Link></li>
              <li><Link to="/activities/yachting">Yachting</Link></li>
            </ul>
          </li>

          <li><Link to="/vr">Virtual Room</Link></li>
          <li><Link to="/about-author">About</Link></li>
        </ul>

        {user && (
          <img
            src={user.avatar || "https://i.pravatar.cc/150"}
            className="profile"
            onClick={toggleProfile}
            style={{ cursor: "pointer" }}
          />
        )}

        <div className="hamburger" onClick={toggleNav}>
          <span></span><span></span><span></span>
        </div>
      </nav>

      {showProfile && user && (
        <UserEdit
          user={user}
          setUser={setUser}    
          onClose={toggleProfile}
          onLogout={handleLogout}
        />
      )}

      <Outlet />
    </>
  );
};

export default Layout;
