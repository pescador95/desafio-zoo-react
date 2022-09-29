import React from "react";

const SessionContext = React.createContext();
export const SessionProvider = ({ children }) => {
  const [session, setSession] = React.useState({
    refreshToken: null,
    token: null,
    email: null,
  });
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const refreshToken = localStorage.getItem("refreshToken");
    setSession({ token, email, refreshToken });
  }, []);

  const signIn = (token, email, refreshToken) => {
    setSession({ token, email, refreshToken });
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    localStorage.setItem("refreshToken", refreshToken);
  };
  const signOut = () => {
    setSession({ token: null, email: null, refreshToken: null });
  };
  return (
    <SessionContext.Provider value={{ session, signIn, signOut }}>
      {children}
    </SessionContext.Provider>
  );
};
export const useSession = () => React.useContext(SessionContext);
