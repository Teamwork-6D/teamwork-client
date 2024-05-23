import React from "react";
import { useNavigate } from 'react-router-dom';



export function NavSection() {

  const navigate = useNavigate();

    return (
      <section className="main-page-nav">
        <button onClick={() => {
          navigate('/projects')
        }}>🏠 Projects</button>
        <button>➕ New Column</button>
        <button>🧾 Project Logs</button>
        <button>👨‍👧‍👧Project Users</button>
        <button>📂 Add File</button>
        <button>🗃️ View Files</button>
      </section>
    );
  }