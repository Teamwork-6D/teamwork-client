import React, { useEffect, useState } from "react";
import sockets from "../../sockets";
import { app } from "../../constants";

export function CreateColumnPopup({ closePopup }) {
  const [title, setTitle] = useState("");

  function handleCreateColumn(e) {
    e.preventDefault();
    const project = JSON.parse(localStorage.getItem("project"));
    const user = JSON.parse(localStorage.getItem("user"));
    const newColumn = {
      title,
      tasksOrder: [],
      projectId: project._id,
      user,
    };
    sockets.emit("new-column", newColumn);
    closePopup(false);
  }

  return (
    <>
      <section className="popup-bg-overlay"></section>
      <section className="create-project-popup">
        <h4 className="popup-header-text">Create Column</h4>
        <section className="create-project-popup-content">
          <input
            className="popup-input"
            type="text"
            placeholder="enter column title"
            required={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="create-popup-btn-list">
            <button className="popup-btn" onClick={handleCreateColumn}>
              submit
            </button>
            <button
              className="popup-btn"
              onClick={() => {
                closePopup(false);
              }}
            >
              close
            </button>
          </div>
        </section>
      </section>
    </>
  );
}

export function DeleteColumnPopup({ closePopup, columnData }) {
  function handleDeleteColumn(e) {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const data = {
      ...columnData,
      user,
    };
    sockets.emit("delete-column", data);
    closePopup(false);
  }

  return (
    <>
      <section className="popup-bg-overlay"></section>
      <section className="create-project-popup">
        <h4 className="popup-header-text">Delete Column</h4>
        <section className="create-project-popup-content">
          <span>
            All the data in this column '{columnData.title}' will be deleted.
          </span>
          <div className="create-popup-btn-list">
            <button className="popup-btn" onClick={handleDeleteColumn}>
              yes
            </button>
            <button
              className="popup-btn"
              onClick={() => {
                closePopup(false);
              }}
            >
              close
            </button>
          </div>
        </section>
      </section>
    </>
  );
}

export function EditColumnPopup({ closePopup, columnData }) {
  const [title, setTitle] = useState(columnData.title);

  function handleEditColumn(e) {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const newColumn = {
      _id: columnData._id,
      title,
      user,
      oldColumn: columnData,
    };
    sockets.emit("edit-column", newColumn);
    closePopup(false);
  }

  return (
    <>
      <section className="popup-bg-overlay"></section>
      <section className="create-project-popup">
        <h4 className="popup-header-text">Create Column</h4>
        <section className="create-project-popup-content">
          <input
            className="popup-input"
            type="text"
            placeholder="enter column title"
            required={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="create-popup-btn-list">
            <button className="popup-btn" onClick={handleEditColumn}>
              submit
            </button>
            <button
              className="popup-btn"
              onClick={() => {
                closePopup(false);
              }}
            >
              close
            </button>
          </div>
        </section>
      </section>
    </>
  );
}

export function CreateTaskPoppup({ closePopup, taskData }) {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [dueDate, setDueDate] = useState("");

  function handleCreateTask(e) {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const project = JSON.parse(localStorage.getItem("project"));
    const column = JSON.parse(localStorage.getItem("column"));
    const taskData = {
      title,
      about,
      dueDate,
      user,
      project,
      column,
    };
    sockets.emit("new-task", taskData);
    closePopup(false);
  }

  return (
    <>
      <section className="popup-bg-overlay"></section>
      <section className="create-task-popup">
        <h4 className="popup-header-text">Create Task</h4>
        <form
          className="create-project-popup-content"
          onSubmit={handleCreateTask}
        >
          <input
            className="popup-input"
            type="text"
            placeholder="enter task title"
            required={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="popup-input"
            type="text"
            placeholder="enter description"
            maxLength={150}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
          <input
            className="popup-input"
            type="date"
            placeholder="enter due date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <div className="create-popup-btn-list">
            <button type="submit" className="popup-btn">
              submit
            </button>
            <button
              className="popup-btn"
              onClick={() => {
                closePopup(false);
              }}
            >
              close
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export function DeleteTaskPopup({ task, closePopup }) {
  function handleDeleteTask(e) {
    e.preventDefault();
    const taskData = {
      _id: task._id,
    };
    sockets.emit("delete-task", taskData);
    closePopup(false);
  }

  return (
    <>
      <section className="popup-bg-overlay"></section>
      <section className="create-project-popup">
        <h4 className="popup-header-text">Delete Task</h4>
        <section className="create-project-popup-content">
          <span style={{ textAlign: "center" }}>
            All the data in this task '{task.title}' will be deleted.
          </span>
          <div className="create-popup-btn-list">
            <button className="popup-btn" onClick={handleDeleteTask}>
              yes
            </button>
            <button
              className="popup-btn"
              onClick={() => {
                closePopup(false);
              }}
            >
              close
            </button>
          </div>
        </section>
      </section>
    </>
  );
}

export function EditTaskPoppup({ closePopup, task }) {
  const [title, setTitle] = useState(task.title);
  const [about, setAbout] = useState(task.about);
  const [dueDate, setDueDate] = useState(task.dueDate);

  function handleEditTask(e) {
    e.preventDefault();
    const taskData = {
      _id: task._id,
      title,
      about,
      dueDate,
    };
    sockets.emit("edit-task", taskData);
    closePopup(false);
  }

  return (
    <>
      <section className="popup-bg-overlay"></section>
      <section className="create-task-popup">
        <h4 className="popup-header-text">Edit Task</h4>
        <form
          className="create-project-popup-content"
          onSubmit={handleEditTask}
        >
          <input
            className="popup-input"
            type="text"
            placeholder="enter task title"
            required={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="popup-input"
            type="text"
            placeholder="enter description"
            maxLength={150}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
          <input
            className="popup-input"
            type="date"
            placeholder="enter due date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <div className="create-popup-btn-list">
            <button type="submit" className="popup-btn">
              submit
            </button>
            <button
              className="popup-btn"
              onClick={() => {
                closePopup(false);
              }}
            >
              close
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export function ViewTaskPopup({ closePopup, taskData }) {
  const [task, setTask] = useState({});

  useEffect(() => {
    handleGetTaskData();
  }, []);

  async function handleGetTaskData() {
    const user = JSON.parse(localStorage.getItem("user"));

    fetch(`${app.server_url}/tasks/${taskData._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        setTask(data.task);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <section className="popup-bg-overlay"></section>
      <section className="create-task-popup">
        <h4 className="popup-header-text">{task?.title}</h4>
        <section className="create-project-popup-content">
          <p>{task?.about}</p>
          <section style={{ width: "100%" }}>
            <p style={{ textAlign: "right" }}>{task?.dueDate}</p>
          </section>
          <aside>
            <span>Assigned Users</span>
            <section className="assigned-users-list">
              {task?.users?.map((user, i) => (
                <aside key={i}>
                  <p className="assigned-user-item">{user.firstName}</p>
                </aside>
              ))}
            </section>
          </aside>
          <div className="create-popup-btn-list">
            <button
              className="popup-btn"
              onClick={() => {
                closePopup(false);
              }}
            >
              close
            </button>
          </div>
        </section>
      </section>
    </>
  );
}

export function AssignUserToTaskPopup({ closePopup, taskData }) {
  const [project, setProject] = useState({});
  useEffect(() => {
    handleGetProjectData();
  }, []);

  function handleRemoveUserFromTask(userId) {
    const user = JSON.parse(localStorage.getItem("user"));

    fetch(`${app.server_url}/tasks/remove-user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ taskId: taskData._id, userId }),
    })
      .then(async (res) => {
        closePopup(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleAddUserToTask(userId) {
    const user = JSON.parse(localStorage.getItem("user"));

    fetch(`${app.server_url}/tasks/add-user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ taskId: taskData._id, userId }),
    })
      .then(async (res) => {
        closePopup(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleGetProjectData() {
    const project = JSON.parse(localStorage.getItem("project"));
    const user = JSON.parse(localStorage.getItem("user"));

    fetch(`${app.server_url}/projects/${project._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        setProject(data.project);
        localStorage.setItem('project', JSON.stringify(data.project))
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <section className="popup-bg-overlay"></section>
      <section className="create-project-popup">
        <h4 className="popup-header-text">Add User To Task</h4>
        <section className="create-project-popup-content">
          <section className="users-to-add-task-list">
            {project?.members?.map((member, i) => (
              <aside className="user-to-add-item" key={i}>
                <p>
                  {member.firstName} {member.lastName}
                </p>
                <button onClick={() => handleAddUserToTask(member._id)}>
                  add
                </button>
                <button onClick={() => handleRemoveUserFromTask(member._id)}>
                 remove
                </button>
              </aside>
            ))}
          </section>
          <div className="create-popup-btn-list">
            <button
              className="popup-btn"
              onClick={() => {
                closePopup(false);
              }}
            >
              close
            </button>
          </div>
        </section>
      </section>
    </>
  );
}
