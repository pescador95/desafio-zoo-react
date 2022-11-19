import React from "react";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import { useSession } from "../hooks/useSession";
import { Animais } from "../pages/Animals";
import { Login } from "../pages/Login/";
import { Usuarios } from "../pages/Users";
import { ForgotPassword } from "../pages/RecoverPassword";
import { Arquivos } from "../pages/Archives";
import { Profile } from "../pages/Profile";
import { DefaultLayout } from "../components/DefaultLayout";


export const ROUTES = {
  login: "/login",
  animals: "/animais",
  arquivos: "/arquivos",
  esqueciSenha: "/esqueciSenha",
  usuarios: "/usuarios",
  profile: "/profile"
};

const noProtectedRoute = [
  {
    path: ROUTES.login,
    element: <Login />,
  },
  {
    path: ROUTES.esqueciSenha,
    element: <ForgotPassword />,
  },
];

const protectedRoute = [
  {
    path: ROUTES.animals,
    element: <Animais />,
  },
  {
    path: ROUTES.arquivos,
    element: <Arquivos />,
  },
  {
    path: ROUTES.usuarios,
    element: <Usuarios />,
  },
  {
    path: ROUTES.profile,
    element: <Profile />
  }
  
];

const AuthRoute = ({ children }) => {
  const { session } = useSession();
  if (!session?.accessToken || !session?.refreshToken) {
    return <Navigate to={ROUTES.login} replace />;
  }
  return <DefaultLayout>{children}</DefaultLayout>;
};

const NoAuthRoute = ({ children }) => {
  const { session } = useSession();

  if (session?.accessToken || session?.refreshToken) {
    return <Navigate to={ROUTES.profile} replace />;
  }
  return <DefaultLayout>{children}</DefaultLayout>;
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
