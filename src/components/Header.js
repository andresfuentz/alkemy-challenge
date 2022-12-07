// libraries
import React from "react";

// hooks
import { Link, useLocation } from "react-router-dom";

// components
import Search from "./Search";

const Header = ({ favs }) => {
  let location = useLocation();
  return (
    <>
      <header className="sticky-top">
        <div className="navbar navbar-expand navbar-dark bg-dark">
          <div className="container-fluid">
            <ul className="navbar-nav">
              <li className="navbar-brand me-0">
                <Link className="nav-link" to="/">
                  {"{ "}
                  <small className="text-secondary">the</small>
                  <span className="text-light"></span>MOVIE
                  <small className="text-secondary">list</small>
                  {" }"}
                </Link>
              </li>

              {location.pathname !== "/" && (
                <li className="nav-item d-flex align-items-center mx-1">
                  <Link className="nav-link" to="/favs">
                    Favs{" "}
                    <small className="badge bg-danger text-white">
                      {favs.length}
                    </small>
                  </Link>
                </li>
              )}
            </ul>

            {location.pathname !== "/" && <Search />}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
