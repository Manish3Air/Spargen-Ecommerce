"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  email: string;
  password: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => boolean;
  register: (user: User) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("authUser");
    if (stored) setCurrentUser(JSON.parse(stored));
  }, []);

  const login = (email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u: User) => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem("authUser", JSON.stringify(user));
      return true;
    }
    return false;
  };

  const register = (user: User): boolean => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const exists = users.find((u: User) => u.email === user.email);
  if (exists) return false;

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  
  return true;
};


  const logout = () => {
    
    setCurrentUser(null);
    localStorage.removeItem("authUser");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
