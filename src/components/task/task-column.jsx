import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { TaskCard } from "./task-card";
import { DeleteColumnPopup, EditColumnPopup, CreateTaskPoppup } from "./popups";

export function TaskColumn({ columnData, index }) {
  const [showDeleteColumnPopup, setShowDeleteColumnPopup] = useState(false);
  const [showEditColumnPopup, setShowEditColumnPopup] = useState(false);
  const [showCreateTaskPopup, setShowCreateTaskPopup] = useState(false);

  return (
    <>
      <Draggable draggableId={columnData._id} index={index}>
        {(provided) => (
          <div
            className="column-item"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <p>{columnData._id}</p>
            <h4>{columnData.title}</h4>
            <Droppable droppableId={columnData._id} type="task">
              {(provided) => (
                <section
                  className="task-list"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {columnData.tasks.map((task, i) => (
                    <TaskCard task={task} key={task._id} index={i} />
                  ))}
                  {provided.placeholder}
                </section>
              )}
            </Droppable>
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
                onClick={() => setShowEditColumnPopup(true)}
              >
                Edit
              </button>
              <button
                className="column-btn-controls"
                onClick={() => setShowDeleteColumnPopup(true)}
              >
                Delete
              </button>
            </section>
          </div>
        )}
      </Draggable>

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
