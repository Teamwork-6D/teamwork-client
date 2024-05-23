import React from "react";


export function TaskCard() {
    return (
      <div className="task-item">
        <h5>some title</h5>
        <p>
          orem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy.
        </p>
        <section className="task-item-btn-controls">
          <button>Open</button>
          <button>Edit</button>
          <button>Delete</button>
        </section>
      </div>
    );
  }