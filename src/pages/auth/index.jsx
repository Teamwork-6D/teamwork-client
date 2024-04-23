import React, { useState } from "react";

import "./styles.css";

function AuthPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
        console.log(firstName, lastName, email, password);
        setLoading(false)
    }, 2000)
  }

  return (
    <section className="signup-container">
      {loading ? <p>Loading...</p> : (<section className="signup-section">
        <h3 className="section-title">Create an Account</h3>
        <form className="signup-form">
          <input
            className="input"
            type="text"
            name="firstname"
            id="firstname"
            placeholder="First Name"
            onChange={(e) => {
              setFirstName(e.target.value)
            }}
          />
          <input
            className="input"
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Last Name"
            onChange={(e) => {
              setLastName(e.target.value)
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
          <button className="button"  onClick={handleSubmit}>
            Login
          </button>
        </form>
        <p className="link">
          Already have an accout? <a href="./index.html">Login</a>
        </p>
      </section>)}
    </section>
  );
}

export default AuthPage;
