import React, { useState } from "react";
import { app } from "../../constants";

import "./styles.css";

export function CreateProjectPopup({ getAllProjects, closeModal }) {
  const [projectName, setProjectName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function createProject(e) {
    e.preventDefault();
    if (projectName.length <= 0) return;

    setLoading(true);
    setError('')
    const userData = JSON.parse(localStorage.getItem("user"));

    fetch(`${app.server_url}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
      body: JSON.stringify({ title: projectName }),
    })
      .then((res) => {
        getAllProjects();
        setLoading(false);
        closeModal();
      })
      .catch((error) => {
        setLoading(false);
        setError("Failed creating new project");
      });
  }

  return (
    <>
      <section className="popup-bg-overlay"></section>
      <section className="create-project-popup">
        <h4 className="popup-header-text">Create Project</h4>
        <section className="create-project-popup-content">
          {error && <p>Error: {error}</p>}
          <input
            className="popup-input"
            type="text"
            placeholder="enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <div className="create-popup-btn-list">
            <button className="popup-btn" onClick={createProject}>
              {loading ? "creating..." : "submit"}
            </button>
            <button className="popup-btn" onClick={closeModal}>
              close
            </button>
          </div>

        </section>
      </section>
    </>
  );
}
