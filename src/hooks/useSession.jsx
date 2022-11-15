import React, { useEffect, useState } from "react";
import { setSessionStorage, getSessionStorage } from "../utils/sessionStorage";

const SessionContext = React.createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState({});
  useEffect(() => {
    const user = getSessionStorage("user", {});
    setSession(user);
  }, []);

  const signIn = (data) => {
    setSession(data);
    setSessionStorage("user", data);
  };
  const signOut = () => {
    setSession(sessionStorage.clear());
  };

  return (
    <SessionContext.Provider value={{ session, signIn, signOut }}>
      {children}
    </SessionContext.Provider>
  );
};
export const useSession = () => {
  const payload = React.useContext(SessionContext);
  try {
    let user = getSessionStorage("user", {});
    return { ...payload, session: user };
  } catch (err) {
    return { ...payload, session: {} };
  }
};

export const getLocalSessionData = () => {
  const user = getSessionStorage("user", {});
  return user;
};
