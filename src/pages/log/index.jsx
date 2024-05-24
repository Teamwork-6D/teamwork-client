import React, { useEffect, useState } from "react";
import { app } from "../../constants";
import "./styles.css";

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}


export default function ProjectLogs() {
  const [logs, setLogs] = useState([]);

  async function getProjectLogs() {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const project = JSON.parse(localStorage.getItem("project"));
      const response = await fetch(`${app.server_url}/activities`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
          projectId: project._id,
        },
      });
      const result = await response.json();
      setLogs(result.activities);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProjectLogs();
  }, []);



  return (
    <section className="logs-page">
      <h4>Project Logs</h4>
      <section className="logs-list-container">
        {logs.map((log, i) => (
            <aside className="log-item" key={i}>
    <p>{log.message}</p>
    <p style={{ textAlign: "right" }}>{formatTimestamp(log.createdAt)}</p>
  </aside>
        ))}
      </section>
    </section>
  );
}
