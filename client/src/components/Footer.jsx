import React from "react";
import { buildInfo } from "../buildInfo.js";

const REPO_URL = "https://github.com/wrightmikea/react-zustand-infinite-poc";

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        &copy; 2025 Michael A Wright |{" "}
        <a href={`${REPO_URL}/blob/main/LICENSE`} target="_blank" rel="noopener noreferrer">
          MIT License
        </a>
      </div>
      <div className="build-info">
        Built: {buildInfo.timestamp} | Host: {buildInfo.host} | Commit:{" "}
        <a href={`${REPO_URL}/commit/${buildInfo.commit}`} target="_blank" rel="noopener noreferrer">
          {buildInfo.commit}
        </a>
      </div>
    </footer>
  );
}
