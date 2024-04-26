import React from 'react';
import './styles.css';

function Header() {
  return (
    <header className="landing-header">
      <div className="header-content">
        <div className="header-text">
          <h1>Project Management Tool</h1>
          <p>Streamline Your Projects with Our Powerful Project Management Tool</p>
          <p>Our project management app helps teams collaborate, organize tasks, and track progress in one centralized platform.</p>
        </div>
        <div className="header-buttons">
          <button className="login-button">Login</button>
          <button className="signup-button">Sign Up</button>
        </div>
      </div>
    </header>
  );
}

function KeyFeatures() {
  return (
    <section className="landing-features">
      <h2>Key Features</h2>
      <ul>
        <li>Task management: Easily create, assign, and track tasks for your projects.</li>
        <li>Team collaboration: Collaborate with your team in real-time, share files, and communicate effortlessly.</li>
        <li>Progress tracking: Get a clear overview of your project's progress with dashboards and reports.</li>
        <li>Role-based access control: Control who has access to what information with role permissions.</li>
      </ul>
    </section>
  );
}

function AboutUs() {
  return (
    <section className="landing-section">
      <h2>About Us</h2>
      <p>We are a group of 5 students who have worked together to create this project. Our collaboration was characterized by fluidity and synergy, with each team member seamlessly contributing their expertise to bring this project management tool to life.</p>
      <p>Combining the strengths of 2 backend developers and 3 frontend developers, we orchestrated a harmonious workflow where ideas flowed freely, resulting in a cohesive and polished final product.</p>
    </section>
  );
}

function Services() {
  return (
    <section className="landing-section">
      <h2>Our Services</h2>
      <ul className="landing-list">
        <li className="landing-list-item">Blazing Fast Efficiency</li>
        <li className="landing-list-item">Simple Onboarding Process</li>
        <li className="landing-list-item">Role-Based Access Control</li>
      </ul>
    </section>
  );
}

function Collaborators() {
  return (
    <section className="collaborator-section">
      <h2>Collaborators</h2>
      <ul className="collaborator-list">
        <li className="collaborator-list-item">Lotanna up2091770</li>
        <li className="collaborator-list-item">Paschal up2151393</li>
        <li className="collaborator-list-item">Evangel up2150727</li>
        <li className="collaborator-list-item">Evie up2109188</li>
        <li className="collaborator-list-item">Bubusara up2156925</li>
      </ul>
    </section>
  );
}

function Footer() {
  return (
    <footer className="landing-footer">
      <p>&copy; 2024 Project Management Tool. All rights reserved.</p>
    </footer>
  );
}

// Define LandingPage component
function LandingPage() {
  return (
    <div className="landing-container">
      <Header />
      <KeyFeatures />
      <AboutUs />
      <Services />
      <Collaborators />
      <Footer />
    </div>
  );
}

export default LandingPage;
