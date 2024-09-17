import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";

import "./index.css";

// [ROOT]
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// NOTE
// "@material-tailwind/react": "^2.1.10" library with type problems
// "@types/react": "18.2.19" must have this version specificaly
//
