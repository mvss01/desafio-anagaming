"use client";
import React, { createContext, useContext, ReactNode, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  login: () => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

import { SessionProvider } from "next-auth/react";

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return (
    <SessionProvider>
      <AuthProviderInner>{children}</AuthProviderInner>
    </SessionProvider>
  );
};

const AuthProviderInner: React.FC<AuthProviderProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(status === "loading");

  React.useEffect(() => {
    setIsLoading(status === "loading");
  }, [status]);

  const user: User | null = session?.user
    ? {
        id: (session.user as User).id || "",
        name: session.user.name || "",
        email: session.user.email || "",
      }
    : null;

  const isAuthenticated = !!user;

  const login = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await signIn("github", { callbackUrl: "/home" });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    signOut();
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isLoading, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
