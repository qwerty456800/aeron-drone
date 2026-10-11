import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

if (window.location.hash) {
  window.history.replaceState(
    window.history.state,
    document.title,
    `${window.location.pathname}${window.location.search}`,
  );
}

window.scrollTo(0, 0);
window.requestAnimationFrame(() => window.scrollTo(0, 0));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
