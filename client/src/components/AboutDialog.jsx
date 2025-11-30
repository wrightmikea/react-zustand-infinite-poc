import React from "react";
import { buildInfo } from "../buildInfo.js";

const REPO_URL = "https://github.com/wrightmikea/react-zustand-infinite-poc";

export default function AboutDialog({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <button className="dialog-close" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <h2>About</h2>
        <p>
          <strong>React + Zustand Infinite Scroll POC</strong>
        </p>
        <p>
          &copy; 2025 Michael A Wright |{" "}
          <a href={`${REPO_URL}/blob/main/LICENSE`} target="_blank" rel="noopener noreferrer">
            MIT License
          </a>
        </p>
        <div className="build-info">
          <p>
            <strong>Build Info</strong>
          </p>
          <p>Timestamp: {buildInfo.timestamp}</p>
          <p>Host: {buildInfo.host}</p>
          <p>
            Commit:{" "}
            <a href={`${REPO_URL}/commit/${buildInfo.commit}`} target="_blank" rel="noopener noreferrer">
              {buildInfo.commit}
            </a>
          </p>
        </div>
        <p>
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        </p>
      </div>
    </div>
  );
}
