import React, { useState } from "react";

import RegisterForm from "../../components/forms/register";
import LoginForm from "../../components/forms/login";

import "./styles.css";

function AuthPage() {
  const [state, setState] = useState("REGISTER");

  function moveTo(to) {
    setState(to);
  }

  return (
    <>
      {state === "REGISTER" && <RegisterForm moveTo={moveTo} />}
      {state === "LOGIN" && <LoginForm moveTo={moveTo} />}
    </>
  );
}

export default AuthPage;
