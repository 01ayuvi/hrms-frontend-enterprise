import { createContext, useEffect, useState } from "react";

import {
  saveTokens,
  clearTokens,
  getAccessToken,
} from "../utils/token";

import { getCurrentUser } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [loading, setLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!getAccessToken()
  );

  const [user, setUser] = useState(null);

  useEffect(() => {
    loadCurrentUser();
  }, []);
    const loadCurrentUser = async () => {
    if (!getAccessToken()) {
      setLoading(false);
      return;
    }

    try {
      const currentUser = await getCurrentUser();

      console.log("Current User:", currentUser);

      setUser(currentUser);

      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);

      clearTokens();

      setUser(null);

      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (access, refresh) => {
    saveTokens(access, refresh);

    setIsAuthenticated(true);

    await loadCurrentUser();
  };

  const logout = () => {
    clearTokens();

    setUser(null);

    setIsAuthenticated(false);
  };
    return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        logout,
        loadCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;