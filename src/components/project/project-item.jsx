import React from "react";
import { useNavigate } from "react-router-dom";

import "./styles.css";

function ProjectItem({ project, setSelectedProject, openDeleteProjectPopup }) {
  const navigate = useNavigate();

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
        <button
          className="project-item-btn"
          onClick={() => {
            setSelectedProject(project);
            navigate(`/projects/${project._id}`);
          }}
        >
          open
        </button>
        <button
          className="project-item-btn"
          onClick={() => {
            setSelectedProject(project);
          }}
        >
          edit
        </button>
        <button
          className="project-item-btn"
          onClick={() => {
            setSelectedProject(project);
            openDeleteProjectPopup();
          }}
        >
          delete
        </button>
      </p>
    </div>
  );
}

export default ProjectItem;
