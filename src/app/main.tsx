import React from "react";
import { createRoot } from "react-dom/client";

import App from "./app";
import "./style/globall.css";

import "@fontsource/inter";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
