import React, { useState, useEffect } from "react";

export function CreateColumnPopup({ createColumn, closeModal }) {
  const [columnName, setColumnName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});


  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (userInfo && userInfo !== undefined && userInfo !== null) {
      setUserData(userInfo);
    }
  }, []);

  function handleCreateColumn() {
    if (!columnName.trim()) {
      setError("Column name cannot be empty");
      return;
    }

    setLoading(true);
    setError("");

    createColumn(columnName, userData.token)
      .then(() => {
        setLoading(false);
        closeModal();
      })
      .catch((error) => {
        setLoading(false);
        setError("Failed to create column");
      });
  }

  return (
    <>
      <div className="popup-bg-overlay" onClick={closeModal}></div>
      <div className="create-column-popup">
        <h4 className="popup-header-text">Create Column</h4>
        <div className="create-column-popup-content">
          {error && <p>Error: {error}</p>}
          <input
            className="popup-input"
            type="text"
            placeholder="Enter column name"
            value={columnName}
            onChange={(e) => setColumnName(e.target.value)}
          />
          <div className="create-popup-btn-list">
            <button className="popup-btn" onClick={handleCreateColumn} disabled={loading}>
              {loading ? "Creating..." : "Submit"}
            </button>
            <button className="popup-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export function EditColumnPopup({ column, editColumn, closeModal }) {
  const [columnName, setColumnName] = useState(column.name);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (userInfo && userInfo !== undefined && userInfo !== null) {
      setUserData(userInfo);
    }
  }, []);

  function handleEditColumn() {
    if (!columnName.trim()) {
      setError("Column name cannot be empty");
      return;
    }

    setLoading(true);
    setError("");

    editColumn(column._id, columnName, userData.token)
      .then(() => {
        setLoading(false);
        closeModal();
      })
      .catch((error) => {
        setLoading(false);
        setError("Failed to edit column");
      });
  }

  return (
    <>
      <div className="popup-bg-overlay" onClick={closeModal}></div>
      <div className="edit-column-popup">
        <h4 className="popup-header-text">Edit Column</h4>
        <div className="edit-column-popup-content">
          {error && <p>Error: {error}</p>}
          <input
            className="popup-input"
            type="text"
            value={columnName}
            onChange={(e) => setColumnName(e.target.value)}
          />
          <div className="edit-popup-btn-list">
            <button className="popup-btn" onClick={handleEditColumn} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
            <button className="popup-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export function DeleteColumnPopup({ column, deleteColumn, closeModal }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (userInfo && userInfo !== undefined && userInfo !== null) {
      setUserData(userInfo);
    }
  }, []);

  function handleDeleteColumn() {
    setLoading(true);
    setError("");

    deleteColumn(column._id, userData.token)
      .then(() => {
        setLoading(false);
        closeModal();
      })
      .catch((error) => {
        setLoading(false);
        setError("Failed to delete column");
      });
  }

  return (
    <>
      <div className="popup-bg-overlay" onClick={closeModal}></div>
      <div className="delete-column-popup">
        <h4 className="popup-header-text">Delete Column</h4>
        <div className="delete-column-popup-content">
          <p>All the data in this column '{column.name}' will be deleted</p>
          {error && <p>Error: {error}</p>}
          <div className="delete-popup-btn-list">
            <button className="popup-btn" onClick={handleDeleteColumn} disabled={loading}>
              {loading ? "Deleting..." : "Yes"}
            </button>
            <button className="popup-btn" onClick={closeModal}>
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
