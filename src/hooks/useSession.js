import React from "react";

const SessionContext = React.createContext();
export const SessionProvider = ({ children }) => {
  const [session, setSession] = React.useState({
    email: null,
    roleUsuario: null,
    token: null,
    expireDateAccessToken: null,
    refreshToken: null,
    expireDateRefreshToken: null,
  });
  React.useEffect(() => {
    const email = localStorage.getItem("email");
    const roleUsuario = localStorage.getItem("roleUsuario");
    const token = localStorage.getItem("accessToken");
    const expireDateAccessToken = localStorage.getItem("expireDateAccessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const expireDateRefreshToken = localStorage.getItem(
      "expireDateRefreshToken"
    );
    setSession({
      email,
      roleUsuario,
      token,
      expireDateAccessToken,
      refreshToken,
      expireDateRefreshToken,
    });
  }, []);

  const signIn = (
    email,
    roleUsuario,
    token,
    expireDateAccessToken,
    refreshToken,
    expireDateRefreshToken
  ) => {
    setSession({
      email,
      roleUsuario,
      token,
      expireDateAccessToken,
      refreshToken,
      expireDateRefreshToken,
    });
    localStorage.setItem("email", email);
    localStorage.setItem("roleUsuario", roleUsuario);
    localStorage.setItem("accessToken", token);
    localStorage.setItem("expireDateAccessToken", expireDateAccessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("expireDateRefreshToken", expireDateRefreshToken);
  };
  const signOut = () => {
    setSession({
      email: null,
      roleUsuario: null,
      token: null,
      expireDateAccessToken: null,
      refreshToken: null,
      expireDateRefreshToken: null,
    });
  };
  return (
    <SessionContext.Provider value={{ session, signIn, signOut }}>
      {children}
    </SessionContext.Provider>
  );
};
export const useSession = () => React.useContext(SessionContext);
