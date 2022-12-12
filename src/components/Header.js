// libraries
import React from "react";

// hooks
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// components
import Search from "./Search";

const Header = ({ favs }) => {
  let location = useLocation();

  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleWindowResize() {
      setInnerWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <>
      <header className="sticky-top">
        <div className="navbar navbar-expand-sm navbar-dark bg-dark">
          <div className="container-fluid">
            <button
              type="button"
              className="navbar-toggler"
              data-bs-toggle="collapse"
              data-bs-target="#menuNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="navbar-brand user-select-none">
              {"{ "}
              <small className="text-secondary">the</small>
              <span className="text-light"></span>MOVIE
              <small className="text-secondary">list</small>
              {" }"}
            </div>

            <div id="menuNav" className="collapse navbar-collapse">
              {location.pathname !== "/" && (
                <div className={`${innerWidth > 575 && `d-inline-block`}`}>
                  <ul className={`navbar-nav`}>
                    <li
                      className={`nav-item ${
                        innerWidth < 576 ? "mt-2" : "me-1"
                      }`}
                    >
                      <Link
                        className={`nav-link btn btn-outline-secondary border-0 ${location.pathname ===
                          "/list" && "disabled"}`}
                        to="/list"
                      >
                        Home
                      </Link>
                    </li>
                    <li
                      className={`nav-item ${
                        innerWidth < 576 ? "mt-2" : "me-1"
                      }`}
                    >
                      <Link
                        className={`nav-link btn btn-outline-secondary border-0 ${location.pathname ===
                          "/favs" && "disabled"}`}
                        to="/favs"
                      >
                        Favs{" "}
                        <small className="badge bg-danger text-white">
                          {favs.length}
                        </small>
                      </Link>
                    </li>
                    <li
                      className={`${
                        innerWidth < 576
                          ? "mt-2"
                          : "position-absolute end-0 me-2"
                      }`}
                    >
                      <Search />
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
