import React, { useState, useEffect } from "react";
import { app } from "../../constants";

import ProjectList from "../../components/project/project-list";
import { CreateProjectPopup } from "../../components/project/popups";

import "./styles.css";

function ProjectPage() {
  const [projects, setProjects] = useState([]);
  const [showCreateProjectPopup, setShowCreatePopup] = useState(false);

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
        openModal={() => {
          setShowCreatePopup(true);
        }}
      />
      {showCreateProjectPopup && (
        <CreateProjectPopup
          getAllProjects={handleGetAllUserProjects}
          closeModal={() => {
            setShowCreatePopup(false);
          }}
        />
      )}
    </section>
  );
}

export default ProjectPage;
