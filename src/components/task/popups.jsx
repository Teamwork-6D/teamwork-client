import React, { useState } from "react";

export function CreateTaskPodpup() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <>
      <section className="popup-bg-overlay"></section>
      <section className="create-task-popup">
        <h4 className="popup-header-text">Create Task</h4>
        <section className="create-project-popup-content">
          {error && <p>Error: {error}</p>}
          <input
            className="popup-input"
            type="text"
            placeholder="enter task name"
          />
          <input
            className="popup-input"
            type="text-area"
            placeholder="enter task description name"
          />
          <input
            className="popup-input"
            type="date"
            placeholder="enter task due date"
          />
          <div className="create-popup-btn-list">
            <button className="popup-btn" disabled={loading}>
              {loading ? "creating..." : "submit"}
            </button>
            <button className="popup-btn">close</button>
          </div>
        </section>
      </section>
    </>
  );
}

export function DeleteTaskPopup() {
    return (
    <>
      <section className="popup-bg-overlay"></section>
      <section className="create-task-popup">
        <h4 className="popup-header-text">Delete Task</h4>
        <span>
          This '{task.title}' will be deleted
        </span>
        <section className="create-task-popup-content">
          {error && <p>Error: {error}</p>}
          <div className="create-popup-btn-list">
            <button
              className="popup-btn"
              onClick={handleDeleteTask}
              disabled={loading}
            >
              {loading ? "deleting..." : "yes"}
            </button>
            <button className="popup-btn" onClick={closeModal}>
              no
            </button>
          </div>
        </section>
      </section>
    </>
  );
}