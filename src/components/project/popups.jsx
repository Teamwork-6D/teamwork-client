import React, { useEffect, useState } from "react";
import { app } from "../../constants";

import "./styles.css";



export function CreateProjectPopup({ getAllProjects, closeModal }) {
  const [projectName, setProjectName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});


    useEffect(() => {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      if(userInfo && userInfo !== undefined && userInfo !== null) {
        setUserData(userInfo)
      }
    }, [])

  function createProject(e) {
    e.preventDefault();
    if (projectName.length <= 0) return;

    setLoading(true);
    setError("");

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
            <button
              className="popup-btn"
              onClick={createProject}
              disabled={loading}
            >
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

export function DeleteProjectPopup({ project, closeModal, getAllProjects }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});


  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if(userInfo && userInfo !== undefined && userInfo !== null) {
      setUserData(userInfo)
    }
  }, [])

  function handleDeleteProject() {
    fetch(`${app.server_url}/projects/${project._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    })
      .then((res) => {
        getAllProjects();
        setLoading(false);
        closeModal();
      })
      .catch((error) => {
        setLoading(false);
        setError("Failed to delete project");
      });
  }

  return (
    <>
      <section className="popup-bg-overlay"></section>
      <section className="create-project-popup">
        <h4 className="popup-header-text">Delete Project</h4>
        <span>
          All the data in this project '{project.title}' will be deleted
        </span>
        <section className="create-project-popup-content">
          {error && <p>Error: {error}</p>}
          <div className="create-popup-btn-list">
            <button
              className="popup-btn"
              onClick={handleDeleteProject}
              disabled={loading}
            >
              {loading ? "deleting..." : "yes"}
            </button>
            <button className="popup-btn" onClick={closeModal}>
              no
            </button>
          </div>
        </section>
      </section>
    </>
  );
}

export function EditProjectPopup({ project, closeModal, getAllProjects }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [projectName, setProjectName] = useState(project.title);
  const [userData, setUserData] = useState({});


  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if(userInfo && userInfo !== undefined && userInfo !== null) {
      setUserData(userInfo)
    }
  }, [])

  function handleEditProject() {
    fetch(`${app.server_url}/projects/${project._id}`, {
      method: "PATCH",
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
        setError("Failed to edit project");
      });
  }

  return (
    <>
      <section className="popup-bg-overlay"></section>
      <section className="create-project-popup">
        <h4 className="popup-header-text">Edit Project</h4>
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
            <button
              className="popup-btn"
              onClick={handleEditProject}
              disabled={loading}
            >
              {loading ? "saving..." : "save"}
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
