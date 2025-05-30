"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  login: () => Promise<void>;
  logout: () => void;
  isLoading: boolean;
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

  const user: User | null = session?.user
    ? {
        id: session.user.id || "",
        name: session.user.name || "",
        email: session.user.email || "",
        avatar: session.user.image || undefined,
      }
    : null;

  const login = async (): Promise<void> => {
    await signIn("github");
  };

  const logout = () => {
    signOut();
  };

  const isLoading = status === "loading";

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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
