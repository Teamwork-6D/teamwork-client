import React from "react";

import "./styles.css";

function NavSection() {
  return <section className="main-page-nav"></section>;
}

function MainPage() {
  return (
    <section className="main-page">
      <NavSection />
      <section className="columns-list">
        <div className="column-item"></div>
        <div className="column-item"></div>
        <div className="column-item"></div>
        <div className="column-item"></div>
        <div className="column-item"></div>
        <div className="column-item"></div>
      </section>
    </section>
  );
}

export default MainPage;
