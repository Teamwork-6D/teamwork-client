import React from "react";

import ProjectItem from "./project-item";

import "./styles.css";

function ProjectList() {
  return (
    <section className="project-list-container">
      <h4 className="header-title-text">Project Lists</h4>
      <section className="project-list">
        <ProjectItem
          project={{
            title: "Some Title",
            members: [],
            owner: { firstName: "Evangel" },
          }}
        />
      </section>
    </section>
  );
}

export default ProjectList;
