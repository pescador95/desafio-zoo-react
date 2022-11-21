import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "./hooks/useSession";
import { CustomRoutes } from "./routes/routes";
import "./styles/global.css";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SessionProvider>
    <QueryClientProvider client={queryClient}>
      <CustomRoutes />
      <ToastContainer />
    </QueryClientProvider>
  </SessionProvider>
);
