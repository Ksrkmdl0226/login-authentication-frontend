import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setCurrentData }) => {
  const navigate = useNavigate();
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg shadow-lg fixed-top"
        style={{ backgroundColor: "#596ABB" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand text-light fw-normal">
            <span className="ms-2 fs-4 fw-medium">Teacher Portal</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button
                  className="btn btn-outline-light"
                  aria-current="page"
                  onClick={() => navigate("/home")}
                >
                  Home
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="btn ms-2 btn-outline-light"
                  data-bs-toggle="modal"
                  data-bs-target="#customModal"
                  onClick={() => setCurrentData(null)}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
