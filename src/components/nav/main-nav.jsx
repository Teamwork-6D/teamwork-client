import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import sockets from "../../sockets";

import { CreateColumnPopup } from "../task/popups";
import { AddUserToProjectPopup, ViewProjectUsersPopup } from "../project/popups";

export function NavSection() {
  const navigate = useNavigate();

  const [showCreateColumnPopup, setShowCreateColumnPopup] = useState(false);
  const [showAddUserPopup, setShowAddUserPopup] = useState(false);
  const [showViewProjectUsers, setShowViewProjectUsers] = useState(false);

  return (
    <>
      <section className="main-page-nav">
        <button
          onClick={() => {
            sockets.disconnect();
            navigate("/projects");
          }}
        >
          🏠 Projects
        </button>
        <button onClick={() => setShowCreateColumnPopup(true)}>
          ➕ New Column
        </button>
        <button
          onClick={() => {
            const project = JSON.parse(localStorage.getItem("project"));
            navigate(`/projects/${project._id}/logs`);
          }}
        >
          🧾 Project Logs
        </button>
        <button onClick={() => setShowAddUserPopup(true)}>Add User To Project</button>
        <button onClick={() => setShowViewProjectUsers(true)}>👨‍👧‍👧View Users</button>
        {/* <button>📂 Add File</button>
        <button>🗃️ View Files</button> */}
        <button onClick={() => {
          localStorage.removeItem('user');
          localStorage.removeItem('project');
          localStorage.removeItem('column');
          navigate('/')
        }}>Logout</button>
      </section>
      {showCreateColumnPopup && (
        <CreateColumnPopup closePopup={setShowCreateColumnPopup} />
      )}
      {showAddUserPopup && (
        <AddUserToProjectPopup viewUserPopup={setShowViewProjectUsers} closePopup={setShowAddUserPopup} />
      )}
      {showViewProjectUsers && (
        <ViewProjectUsersPopup closePopup={setShowViewProjectUsers} />
      )}
    </>
  );
}
