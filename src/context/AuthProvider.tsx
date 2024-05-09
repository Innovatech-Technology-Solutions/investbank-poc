import React, { createContext, useMemo, useState } from 'react';
import { logout } from '../utils/Commonutils'

type AuthProviderProps = {
  children: React.ReactNode;
};
export type AuthContextProps = {
  auth: string | null;
  setAuth: (newAuth: string | null) => void;
  logout: (cb?: any) => void;
};
export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<string | null>(() => {
    return localStorage.getItem('token') || null;
  });

  const updateAuth = (newAuth: string | null) => {
    setAuth(newAuth);
  };


  const memoizedContextValue = useMemo(() => ({ auth, setAuth: updateAuth, logout }), [auth]);

  return <AuthContext.Provider value={memoizedContextValue}>{children}</AuthContext.Provider>;
};
