import React, { useState } from "react";
import { app } from "../../constants";
import { useNavigate } from "react-router-dom";

import "./styles.css";

function RegisterForm({ moveTo }) {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    fetch(`${app.server_url}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    })
      .then(async (res) => {
        const result = await res.json();
        const { user } = result;
        setLoading(false);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/projects");
      })
      .catch((error) => {
        setLoading(false);
        setError("Login failed");
      });
  }

  return (
    <section className="signup-container">
      <section className="signup-section">
        <h3 className="section-title">Register</h3>
        <form className="signup-form">
          <input
            className="input"
            type="text"
            name="firstname"
            id="firstname"
            placeholder="First Name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <input
            className="input"
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Last Name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <input
            className="input"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
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
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="button" onClick={handleSubmit}>
            {loading ? "loading..." : "Register"}
          </button>
          {error.length > 0 && <p>Error: {`${error}`}</p>}
        </form>
        <p className="link">
          Already have an account?
          <span
            className="form-link"
            onClick={() => {
              moveTo("LOGIN");
            }}
          >
            Login
          </span>
        </p>
      </section>
    </section>
  );
}

export default RegisterForm;
