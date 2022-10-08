import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSession } from "../hooks/useSession";
import { Animais } from "../pages/Animals";
import { Login } from "../pages/Login";

export const ROUTES = {
  login: "/login",
  animals: "/animais",
};

const noProtectedRoute = [
  {
    path: ROUTES.login,
    element: <Login />,
  },
];

const protectedRoute = [
  {
    path: ROUTES.animals,
    element: <Animais />,
  },
];

const AuthRoute = ({ children }) => {
  const { session } = useSession();

  if (!session?.accessToken || !session?.refreshToken) {
    return <Navigate to={ROUTES.login} replace />;
  }

  return children;
};

const NoAuthRoute = ({ children }) => {
  const { session } = useSession();

  if (session?.accessToken || session?.refreshToken) {
    return <Navigate to={ROUTES.animals} replace />;
  }

  return children;
};

export const CustomRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {noProtectedRoute?.map((route, index) => (
          <Route
            {...route}
            key={index}
            element={<NoAuthRoute>{route?.element}</NoAuthRoute>}
          />
        ))}

        {protectedRoute?.map((route, index) => (
          <Route
            {...route}
            key={index}
            element={<AuthRoute>{route?.element}</AuthRoute>}
          />
        ))}

        <Route path="*" element={<Navigate to={ROUTES.login} />} />
      </Routes>
    </BrowserRouter>
  );
};
