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
  const [selectedProject, setSelectedProject] = useState({});
  const [openPopup, setOpenPopup] = useState(null);

  const fetchProjects = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const response = await fetch(`${app.server_url}/projects`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      });
      const result = await response.json();
      setProjects(result.projects);
    } catch (error) {
      // Display error message to user
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenPopup = (type) => {
    setOpenPopup(type);
  };

  const handleClosePopup = () => {
    setOpenPopup(null);
  };

  return (
    <section className="project-page">
      <ProjectList
        projects={projects}
        openCreateProjectPopup={() => handleOpenPopup("create")}
        openDeleteProjectPopup={() => handleOpenPopup("delete")}
        openEditProjectPopup={() => handleOpenPopup("edit")}
        setSelectedProject={setSelectedProject}
      />
      {openPopup === "create" && (
        <CreateProjectPopup
          getAllProjects={fetchProjects}
          closeModal={handleClosePopup}
        />
      )}
      {openPopup === "delete" && (
        <DeleteProjectPopup
          project={selectedProject}
          closeModal={handleClosePopup}
          getAllProjects={fetchProjects}
        />
      )}
      {openPopup === "edit" && (
        <EditProjectPopup
          project={selectedProject}
          closeModal={handleClosePopup}
          getAllProjects={fetchProjects}
        />
      )}
    </section>
  );
}

export default ProjectPage;