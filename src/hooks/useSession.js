import React, { useEffect, useState } from "react";
import { setSessionStorage, getSessionStorage } from "../utils/sessionStorage";

const SessionContext = React.createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState({
    email: null,
    roleUsuario: null,
    token: null,
    expireDateAccessToken: null,
    refreshToken: null,
    expireDateRefreshToken: null,
    authToken: null,
  });

  useEffect(() => {
    const user = getSessionStorage("user", {});
    setSession(user);
  }, []);

  const signIn = (data) => {
    setSession(data);
    setSessionStorage("user", data);
  };
  const signOut = () => {
    setSession({});
  };

  return (
    <SessionContext.Provider value={{ session, signIn, signOut }}>
      {children}
    </SessionContext.Provider>
  );
};
export const useSession = () => React.useContext(SessionContext);
