import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { app } from "../../constants";

import "./styles.css";

function LoginForm({ moveTo }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

   try {
    fetch(`${app.server_url}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(async (res) => {
        const result = await res.json();
        const { user } = result;
        if(user !==  undefined || user !== null) {
          setLoading(false);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/projects");
        } else {
          throw new Error()
        }
      })
      .catch((error) => {
       throw new Error('login failed')
      });
   } catch (error) {
    console.log(error);
    setLoading(false);
    setError("Login failed");
   }
  }

  return (
    <section className="signup-container">
      <section className="signup-section">
        <h3 className="section-title">Login</h3>
        <form className="signup-form">
          <input
            className="input"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="input"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="button" onClick={handleSubmit} disabled={loading}>
            {loading ? "loading..." : "Login"}
          </button>
          {error.length > 0 && <p>Error: {`${error}`}</p>}
        </form>
        <p className="link">
          Don't have an account?
          <span
            className="form-link"
            onClick={() => {
              moveTo("REGISTER");
            }}
          >
            Register
          </span>
        </p>
      </section>
    </section>
  );
}

export default LoginForm;
