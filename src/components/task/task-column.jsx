import React, { useState } from "react";
import { TaskCard } from "./task-card";

import { DeleteColumnPopup, EditColumnPopup, CreateTaskPoppup } from "./popups";

export function TaskColumn({ columnData }) {
  const [showDeleteColumnPopup, setShowDeleteColumnPopup] = useState(false);
  const [showEditColumnPopup, setShowEditColumnPopup] = useState(false);
  const [showCreateTaskPopup, setShowCreateTaskPopup] = useState(false);

  return (
    <>
      <div className="column-item">
        <h4>{columnData.title}</h4>
        <section className="task-list">
          {columnData.tasks.map((task, i) => (
            <TaskCard task={task} key={i} />
          ))}
        </section>
        <section className="column-btn-controls-container">
          <button
            className="column-btn-controls"
            onClick={() => {
              localStorage.setItem("column", JSON.stringify(columnData));
              setShowCreateTaskPopup(true);
            }}
          >
            Add Task
          </button>
          <button
            className="column-btn-controls"
            onClick={() => {
              setShowEditColumnPopup(true);
            }}
          >
            Edit
          </button>
          <button
            className="column-btn-controls"
            onClick={() => {
              setShowDeleteColumnPopup(true);
            }}
          >
            Delete
          </button>
        </section>
      </div>
      {showDeleteColumnPopup && (
        <DeleteColumnPopup
          closePopup={setShowDeleteColumnPopup}
          columnData={columnData}
        />
      )}
      {showEditColumnPopup && (
        <EditColumnPopup
          closePopup={setShowEditColumnPopup}
          columnData={columnData}
        />
      )}
      {showCreateTaskPopup && (
        <CreateTaskPoppup closePopup={setShowCreateTaskPopup} />
      )}
    </>
  );
}
