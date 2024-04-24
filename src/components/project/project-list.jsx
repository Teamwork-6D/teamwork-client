import React from "react";

import ProjectItem from "./project-item";

import "./styles.css";

function ProjectList({
  projects,
  openCreateProjectPopup,
  setSelectedProject,
  openDeleteProjectPopup,
}) {
  return (
    <section className="project-list-container">
      <h4 className="header-title-text">Project Lists</h4>
      <section className="project-list">
        {projects &&
          projects.map((project) => (
            <ProjectItem
              key={project._id}
              project={project}
              setSelectedProject={setSelectedProject}
              openDeleteProjectPopup={openDeleteProjectPopup}
            />
          ))}
        <button className="create-project-btn" onClick={openCreateProjectPopup}>
          Create Project
        </button>
      </section>
    </section>
  );
}

export default ProjectList;
