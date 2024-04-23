import React from "react";

import "./styles.css";

function ProjectItem({ project }) {
  return (
    <div className="project-item">
      <p>
        <span>Title: </span> {project.title}
      </p>
      <p>
        <span>Members: </span> {project.members.length}
      </p>
      <p>
        <span>Owner: </span> {project.owner.firstName}
      </p>
      <p className="project-item-btn-list">
        <button className="project-item-btn">open</button>
        <button className="project-item-btn">edit</button>
        <button className="project-item-btn">delete</button>
      </p>
    </div>
  );
}

export default ProjectItem;
