import React from "react";
import { TaskCard } from "./task-card";

export function TaskColumn() {
    return (
      <div className="column-item">
        <h4>Title</h4>
        <section className="task-list">
          <TaskCard />
          <TaskCard />
        </section>
        <section className="column-btn-controls-container">
          <button className="column-btn-controls">Add Task</button>
          <button className="column-btn-controls">Edit</button>
          <button className="column-btn-controls">Delete</button>
        </section>
      </div>
    );
  }