// libraries
import React from "react";

// hooks
import { Link, useLocation } from "react-router-dom";
import { BsHouseDoorFill, BsHeartFill } from "react-icons/bs";

// components
import Search from "./Search";

const Header = ({ favs }) => {
  let location = useLocation();
  return (
    <>
      <header className="sticky-top">
        <div className="navbar navbar-expand navbar-dark bg-dark">
          <div className="container-fluid">
            <ul className="navbar-nav me-auto">
              <Link className="nav-link" to="/">
                <li className="navbar-brand">The Movie List</li>
              </Link>

              {location.pathname !== "/" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/favs">
                      <BsHeartFill />
                      <span className="top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {favs.length}
                      </span>
                    </Link>
                  </li>
                </>
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
