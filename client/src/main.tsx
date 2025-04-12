import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add document title
document.title = "WhatBytes - Skill Test Dashboard";

createRoot(document.getElementById("root")!).render(<App />);
