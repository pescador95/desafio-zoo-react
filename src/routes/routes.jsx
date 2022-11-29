import React from "react";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import { useSession, user } from "../hooks/useSession";
import { Animais } from "../pages/Animals";
import { Login } from "../pages/Login/";
import { Users } from "../pages/Users";
import { ForgotPassword } from "../pages/RecoverPassword";
import { Upload } from "../pages/Archives";
import { Profile } from "../pages/Profile";
import { DefaultLayout } from "../components/DefaultLayout";
import { EnriquecimentoAmbiental } from "../pages/EnriquecimentoAmbiental";
import { Medicacao } from "../pages/Medicacao";
import { Nutricao } from "../pages/Nutricao";
import { HistoricoClinico } from "../pages/HistoricoClinico";
import { HistoricoEtologico } from "../pages/HistoricoEtologico";
import { SideBarMenuData } from "../components/SideBarMenuComponents";

export const ROUTES = {
  login: "/login",
  animals: "/animais",
  arquivos: "/arquivos",
  esqueciSenha: "/esqueciSenha",
  usuarios: "/usuarios",
  profile: "/profile",
  enriquecimentoAmbiental: "/enriquecimentoAmbiental",
  historicoClinico: "/historicoClinico",
  historicoEtologico: "/historicoEtologico",
  medicacao: "/medicacao",
  nutricao: "/nutricao",
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
    rolesAllowed: ["admin", "dev", "biologo", "veterinario", "tratador"],
  },
  {
    path: ROUTES.arquivos,
    element: <Upload />,
    rolesAllowed: ["admin", "dev", "biologo", "veterinario", "tratador"],
  },
  {
    path: ROUTES.usuarios,
    element: <Users />,
    rolesAllowed: ["admin", "dev"],
  },
  {
    path: ROUTES.profile,
    element: <Profile />,
    rolesAllowed: ["admin", "dev", "biologo", "veterinario", "tratador"],
  },
  {
    path: ROUTES.enriquecimentoAmbiental,
    element: <EnriquecimentoAmbiental />,
    rolesAllowed: ["admin", "dev", "biologo", "veterinario", "tratador"],
  },
  {
    path: ROUTES.historicoClinico,
    element: <HistoricoClinico />,
    rolesAllowed: ["admin", "dev", "biologo", "veterinario", "tratador"],
  },
  {
    path: ROUTES.historicoEtologico,
    element: <HistoricoEtologico />,
    rolesAllowed: ["admin", "dev", "biologo", "veterinario", "tratador"],
  },
  {
    path: ROUTES.medicacao,
    element: <Medicacao />,
    rolesAllowed: ["admin", "dev", "biologo", "veterinario", "tratador"],
  },
  {
    path: ROUTES.nutricao,
    element: <Nutricao />,
    rolesAllowed: ["admin", "dev", "biologo", "veterinario", "tratador"],
  },
];

const AuthRoute = ({ children }) => {
  const { session } = useSession();
  if (
    !session?.accessToken ||
    (!session?.refreshToken &&
      !SideBarMenuData.rolesAllowed.includes(user?.roleUsuario))
  ) {
    return <Navigate to={ROUTES.login} replace />;
  }
  return <DefaultLayout>{children}</DefaultLayout>;
};

const NoAuthRoute = ({ children }) => {
  const { session } = useSession();

  if (session?.accessToken || session?.refreshToken) {
    return <Navigate to={ROUTES.profile} replace />;
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

        {protectedRoute?.map((route, index) =>
          route.rolesAllowed.includes(user?.roleUsuario) ? (
            <Route
              {...route}
              key={index}
              element={<AuthRoute>{route?.element}</AuthRoute>}
            />
          ) : (
            <></>
          )
        )}

        <Route path="*" element={<Navigate to={ROUTES.login} />} />
      </Routes>
    </BrowserRouter>
  );
};
