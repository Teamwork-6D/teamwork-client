import React, { useState } from "react";

export function CreateColumnPodpup() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <>
      <section className="popup-bg-overlay"></section>
      <section className="create-project-popup">
        <h4 className="popup-header-text">Create Project</h4>
        <section className="create-project-popup-content">
          {error && <p>Error: {error}</p>}
          <input
            className="popup-input"
            type="text"
            placeholder="enter project name"
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
