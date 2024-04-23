import React from "react";
import { Route, Routes } from "react-router-dom";

import LandingPage from "./pages/landing";
import MainPage from "./pages/main";
import ProjectPage from "./pages/project";
import AuthPage from "./pages/auth";
// import { ProtectMainRoute, ProtectAuthRoute } from "./components/router";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={

          <LandingPage />
        }
      />
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/projects"
        element={
          <ProjectPage />
        }
      />
      <Route
        path="/projects/:id"
        element={
          <MainPage />
        }
      />
    </Routes>
  );
}

export default App;
