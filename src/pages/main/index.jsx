import React from "react";

import { NavSection } from "../../components/nav/main-nav";
import { TaskColumn } from "../../components/task/task-column";

import "./styles.css";


function MainPage() {
  return (
    <section className="main-page">
      <NavSection />
      <section className="columns-list">
        <TaskColumn />
      </section>
    </section>
  );
}

export default MainPage;
