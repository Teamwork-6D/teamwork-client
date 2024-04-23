import React, { useState } from "react";

import "./styles.css";

function LoginForm({ moveTo }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("will handle login");
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
            Login
          </button>
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
