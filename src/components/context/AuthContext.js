"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initializeUser = () => {
      const storedUser = localStorage.getItem("crunches_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    initializeUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("crunches_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    toast.success("Logout successfully!")
    localStorage.removeItem("crunches_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
