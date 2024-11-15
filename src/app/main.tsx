import React from "react";
import { createRoot } from "react-dom/client";

import NewPreferenceContextProvider from "@shared/contexts/new-preference-context";

import App from "./app";

import "./style/globall.css";
import "@fontsource/inter";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <NewPreferenceContextProvider>
      <App />
    </NewPreferenceContextProvider>
  </React.StrictMode>,
);
