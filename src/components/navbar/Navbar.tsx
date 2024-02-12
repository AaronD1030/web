import "./Navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../../zustand/AuthStore";

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);

  const user = useAuthStore((state) => state.user);


  const toggleLoginModal = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  return (
    <div className="nav">
      <div className="nav-container">
        <section className="nav-link-container"></section>
        <section className="nav-action-container">
          {user ? (
            <div className="navbar-user-logout-container">
              <span>{user}</span>
            </div>
          ) : (
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "black" }}
            >
              <button className="nav-btn" onClick={toggleLoginModal}>
                LOGIN
              </button>
            </Link>
          )}
        </section>
      </div>
    </div>
  );
};

export default Navbar;
