import React, { useState } from "react";

import {
  AssignUserToTaskPopup,
  DeleteTaskPopup,
  EditTaskPoppup,
  ViewTaskPopup,
} from "./popups";

export function TaskCard({ task }) {
  const [showDeleteTaskPopup, setShowDeleteTaskPopup] = useState(false);
  const [showEditTaskPopup, setShowEditTaskPopup] = useState(false);
  const [viewTaskPopup, setviewTaskPopup] = useState(false);
  const [showAssignUserToTaskPopup, setShowAssignUserToTaskPopup] =
    useState(false);

  return (
    <>
      <div className="task-item">
        <h5>{task.title}</h5>
        <span>{task.about}</span>
        {task.dueDate && (
          <span className="task-item-due-date">Due: {task.dueDate}</span>
        )}
        <section className="task-item-btn-controls">
          <button onClick={() => setShowAssignUserToTaskPopup(true)}>
            Add User
          </button>
          <button onClick={() => setviewTaskPopup(true)}>Open</button>
          <button onClick={() => setShowEditTaskPopup(true)}>Edit</button>
          <button onClick={() => setShowDeleteTaskPopup(true)}>Delete</button>
        </section>
      </div>
      {viewTaskPopup && (
        <ViewTaskPopup taskData={task} closePopup={setviewTaskPopup} />
      )}
      {showDeleteTaskPopup && (
        <DeleteTaskPopup task={task} closePopup={setShowDeleteTaskPopup} />
      )}
      {showEditTaskPopup && (
        <EditTaskPoppup task={task} closePopup={setShowEditTaskPopup} />
      )}
      {showAssignUserToTaskPopup && (
        <AssignUserToTaskPopup taskData={task} closePopup={setShowAssignUserToTaskPopup} />
      )}
    </>
  );
}
