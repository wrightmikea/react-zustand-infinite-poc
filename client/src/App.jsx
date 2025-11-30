import React, { useState } from "react";
import InfiniteList from "./components/InfiniteList.jsx";
import AboutDialog from "./components/AboutDialog.jsx";
import GitHubCorner from "./components/GitHubCorner.jsx";

export default function App() {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <>
      <GitHubCorner />
      <div className="header">
        <div className="header-content">
          <div>
            <h1>Infinite Scroll • Zustand • Express</h1>
            <small>Sections fetch on first view; results cached in a Zustand store</small>
          </div>
          <button className="about-btn" onClick={() => setAboutOpen(true)}>
            About
          </button>
        </div>
      </div>
      <div className="spacer" />
      <InfiniteList />
      <AboutDialog open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </>
  );
}