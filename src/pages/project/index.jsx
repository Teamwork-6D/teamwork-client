import React, { useState, useEffect } from "react";
import { app } from "../../constants";

import ProjectList from "../../components/project/project-list";
import {
  CreateProjectPopup,
  DeleteProjectPopup,
  EditProjectPopup,
} from "../../components/project/popups";

import "./styles.css";

function ProjectPage() {
  const [projects, setProjects] = useState([]);
  const [showCreateProjectPopup, setShowCreatePopup] = useState(false);
  const [showDeleteProjectPopup, setShowDeleteProjectPopup] = useState(false);
  const [showEditProjectPopup, setShowEditProjectPopup] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});

  function handleGetAllUserProjects() {
    const userData = JSON.parse(localStorage.getItem("user"));

    fetch(`${app.server_url}/projects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    })
      .then(async (res) => {
        const result = await res.json();
        setProjects(result.projects);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    handleGetAllUserProjects();
  }, []);

  return (
    <section className="project-page">
      <ProjectList
        projects={projects}
        openCreateProjectPopup={() => {
          setShowCreatePopup(true);
        }}
        openDeleteProjectPopup={() => {
          setShowDeleteProjectPopup(true);
        }}
        openEditProjectPopup={() => {
          setShowEditProjectPopup(true);
        }}
        setSelectedProject={setSelectedProject}
      />
      {showCreateProjectPopup && (
        <CreateProjectPopup
          getAllProjects={handleGetAllUserProjects}
          closeModal={() => {
            setShowCreatePopup(false);
          }}
        />
      )}
      {showDeleteProjectPopup && (
        <DeleteProjectPopup
          project={selectedProject}
          closeModal={() => {
            setShowDeleteProjectPopup(false);
          }}
          getAllProjects={handleGetAllUserProjects}
        />
      )}
      {showEditProjectPopup && (
        <EditProjectPopup
          project={selectedProject}
          closeModal={() => {
            setShowEditProjectPopup(false);
          }}
          getAllProjects={handleGetAllUserProjects}
        />
      )}
    </section>
  );
}

export default ProjectPage;
