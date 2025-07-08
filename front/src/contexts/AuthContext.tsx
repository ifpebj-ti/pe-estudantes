"use client";

import { decodeToken, TokenPayload } from "@/services/auth/decodeToken";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: TokenPayload | null;
  isAuthenticated: boolean;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<TokenPayload | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const decoded = decodeToken();
    setUser(decoded);
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);