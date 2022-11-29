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
        <div className="navbar navbar-expand-sm navbar-dark bg-dark">
          <div className="container">
            <span className="navbar-brand">The Movie List</span>

            {location.pathname !== "/" && (
              <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      <BsHouseDoorFill />
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/favs">
                      <BsHeartFill />
                      <span className="top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {favs.length}
                      </span>
                    </Link>
                  </li>
                </ul>
                <Search />
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
