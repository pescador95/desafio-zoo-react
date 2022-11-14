import React from "react";
import ReactDOM from "react-dom/client";
import { SessionProvider } from "./hooks/useSession";
import { CustomRoutes } from "./routes/routes";
import "./styles/global.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SessionProvider>
    <CustomRoutes />
  </SessionProvider>
);
