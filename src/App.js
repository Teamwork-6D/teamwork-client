import React from "react";
import { Route, Routes } from "react-router-dom";

import LandingPage from "./pages/landing";
import MainPage from "./pages/main";
import ProjectPage from "./pages/project";
import AuthPage from "./pages/auth";
import { ProtectAuthRoute, ProtectMainRoute } from "./components/router";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <ProtectAuthRoute>
          <LandingPage />
        </ProtectAuthRoute>
      } />
      <Route
        path="/auth"
        element={
          <ProtectAuthRoute>
            <AuthPage />
          </ProtectAuthRoute>
        }
      />
      <Route
        path="/projects"
        element={
          <ProtectMainRoute>
            <ProjectPage />
          </ProtectMainRoute>
        }
      />
      <Route
        path="/projects/:id"
        element={
          <ProtectMainRoute>
            <MainPage />
          </ProtectMainRoute>
        }
      />
    </Routes>
  );
}

export default App;
