// libraries
import React from "react";
import axios from "axios";
import swAlert from "@sweetalert/with-react";

// hooks
import { useNavigate, Navigate } from "react-router-dom";

const Login = ({ token, setToken }) => {
  let navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (email === "" || password === "") {
      swAlert(<h2>Fields are required and cannot be empty!</h2>);
      return;
    }

    if (email !== "" && !regexEmail.test(email)) {
      swAlert(<h2>You must enter a valid email address!</h2>);
      return;
    }

    if (email !== "challenge@alkemy.org" || password !== "react") {
      swAlert(<h2>Invalid credentials!</h2>);
      return;
    }

    axios
      .post("http://challenge-react.alkemy.org", { email, password })
      .then((res) => {
        swAlert(<h2>Successfully logged in!</h2>);

        const tokenRecibido = res.data.token;
        sessionStorage.setItem("token", tokenRecibido);
        setToken(tokenRecibido);
        navigate("/list");
      })
      .catch((err) => {
        swAlert(
          <>
            <h2>An error has occurred</h2>
            {console.log(err.message)}
          </>
        );
      });
  };

  return (
    <>
      {token ? (
        <Navigate to={"/list"} />
      ) : (
        <div className="d-flex justify-content-center mt-3">
          <div className="row border rounded">
            <h2>Login</h2>
            <form onSubmit={submitHandler}>
              <label className="col-sm-12 col-form-label">
                <span>Email:</span>
                <br />
                <input className="form-control" type="email" name="email" />
              </label>

              <br />

              <label className="col-sm-12 col-form-label">
                <span>Password:</span>
                <br />
                <input
                  className="form-control"
                  type="password"
                  name="password"
                />
              </label>
              <br />
              <button type="submit" className="btn btn-success my-2">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
