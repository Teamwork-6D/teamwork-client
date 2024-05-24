import React from "react";
import { useNavigate } from "react-router-dom";
import sockets from "../../sockets";

import "./styles.css";

function ProjectItem({
  project,
  setSelectedProject,
  openDeleteProjectPopup,
  openEditProjectPopup,
}) {
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
            sockets.connect();
            sockets.emit("join-project", project);
            localStorage.setItem("project", JSON.stringify(project));
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
            openEditProjectPopup();
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
