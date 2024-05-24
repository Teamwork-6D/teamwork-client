import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { NavSection } from "../../components/nav/main-nav";
import { TaskColumn } from "../../components/task/task-column";
import { app } from "../../constants";
import sockets from "../../sockets";

import "./styles.css";

function MainPage() {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    getProjectColumns();

    sockets.on("new-column-success", getProjectColumns);
    sockets.on("delete-column-success", getProjectColumns);
    sockets.on("edit-column-success", getProjectColumns);
    sockets.on("new-task-success", getProjectColumns);
    sockets.on("delete-task-success", getProjectColumns);
    sockets.on("edit-task-success", getProjectColumns);

    return function () {
      sockets.off("new-column-success", getProjectColumns);
      sockets.off("delete-column-success", getProjectColumns);
      sockets.off("edit-column-success", getProjectColumns);
      sockets.off("new-task-success", getProjectColumns);
      sockets.off("delete-task-success", getProjectColumns);
      sockets.off("edit-task-success", getProjectColumns);
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

  function onDragEnd(result) {
    const { destination, draggableId, source, type } = result;

    console.log({
      destination,
      draggableId,
      source,
      type
    });
  }

  return (
    <section className="main-page">
      <NavSection />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="column" direction="horizontal" type="column">
          {(provided) => (
            <section
              className="columns-list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {columns.map((column, i) => (
                <TaskColumn columnData={column} key={column._id} index={i} />
              ))}
              {provided.placeholder}
            </section>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
}

export default MainPage;
