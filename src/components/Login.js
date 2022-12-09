// libraries
import React from "react";

// hooks
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <>
      {isAuthenticated ? (
        <Navigate to={"/list"} />
      ) : (
        <div className="d-flex justify-content-center mt-3">
          <div className="row border rounded mx-2">
            <h3 className="mt-1">You are not logged!</h3>
            <p>Please login to continue.</p>
            <div className="col">
              <button
                className="btn btn-dark d-block w-100 mb-2"
                onClick={() => loginWithRedirect()}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
