import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Footer = () => {
  const { user, isAuthenticated, logout } = useAuth0();
  return (
    <>
      {isAuthenticated && (
        <div className="navbar navbar-expand-sm">
          <footer className="text-center bg-white border-top fixed-bottom">
            <small className="text-muted">
              Logged as {user.name} -{" "}
              <button
                className="badge text-bg-secondary mb-1"
                onClick={() => logout()}
              >
                Log out
              </button>
            </small>
          </footer>
        </div>
      )}
    </>
  );
};

export default Footer;
