import React, { useEffect, useState } from "react";

import { NavSection } from "../../components/nav/main-nav";
import { TaskColumn } from "../../components/task/task-column";
import { app } from "../../constants";
import sockets from "../../sockets";

import "./styles.css";

function MainPage() {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    getProjectColumns();

    sockets.on("new-column-success", () => {
      getProjectColumns();
    });

    sockets.on("delete-column-success", () => {
      getProjectColumns();
    });

    sockets.on("edit-column-success", () => {
      getProjectColumns();
    });

    sockets.on("new-task-success", () => {
      getProjectColumns();
    });

    sockets.on("delete-task-success", () => {
      getProjectColumns();
    });

    sockets.on("edit-task-success", () => {
      getProjectColumns();
    });

    return function () {
      sockets.off("new-column-success");
      sockets.off("delete-column-success");
      sockets.off('edit-column-success');
      sockets.off('new-task-success');
      sockets.off('delete-task-success');
      sockets.off('edit-task-success');
    };
  }, []);

  async function getProjectColumns() {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const project = JSON.parse(localStorage.getItem("project"));
      const response = await fetch(`${app.server_url}/columns`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
          projectId: project._id,
        },
      });
      const result = await response.json();
      setColumns(result.columns);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="main-page">
      <NavSection />
      <section className="columns-list">
        {columns.map((column, i) => (
          <TaskColumn columnData={column} key={i} />
        ))}
      </section>
    </section>
  );
}

export default MainPage;
