import React from "react";

import ProjectItem from "./project-item";

import "./styles.css";

function ProjectList({ projects, openModal }) {
  return (
    <section className="project-list-container">
      <h4 className="header-title-text">Project Lists</h4>
      <section className="project-list">
        {projects &&
          projects.map((project) => (
            <ProjectItem key={project._id} project={project} />
          ))}
        <button className="create-project-btn" onClick={openModal}>
          Create Project
        </button>
      </section>
    </section>
  );
}

export default ProjectList;
