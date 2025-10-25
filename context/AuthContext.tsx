"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CustomerUser, AuthResponse } from "@/types";

interface AuthContextType {
  customer: CustomerUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<CustomerUser>) => Promise<{ success: boolean; error?: string }>;
  isAuthenticated: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<CustomerUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load auth state from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("auth_token");
    const savedCustomer = localStorage.getItem("customer_data");
    
    if (savedToken && savedCustomer) {
      try {
        setToken(savedToken);
        setCustomer(JSON.parse(savedCustomer));
      } catch (error) {
        console.error("Failed to load auth state:", error);
        localStorage.removeItem("auth_token");
        localStorage.removeItem("customer_data");
      }
    }
    setIsLoading(false);
  }, []);

  // Save auth state to localStorage
  const saveAuthState = (customer: CustomerUser, token: string) => {
    setCustomer(customer);
    setToken(token);
    localStorage.setItem("auth_token", token);
    localStorage.setItem("customer_data", JSON.stringify(customer));
  };

  // Clear auth state
  const clearAuthState = () => {
    setCustomer(null);
    setToken(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("customer_data");
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result: AuthResponse = await response.json();

      if (!response.ok) {
        return { success: false, error: result.error || "Login failed" };
      }

      if (result.token) {
        saveAuthState(result.customer, result.token);
        return { success: true };
      }

      return { success: false, error: "No token received" };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: "Network error occurred" };
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return { success: false, error: result.error || "Registration failed" };
      }

      // After successful registration, automatically log in
      return await login(data.email, data.password);
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, error: "Network error occurred" };
    }
  };

  const logout = () => {
    clearAuthState();
  };

  const updateProfile = async (data: Partial<CustomerUser>) => {
    if (!token) {
      return { success: false, error: "Not authenticated" };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/customers/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return { success: false, error: result.error || "Update failed" };
      }

      // Update customer data in state and localStorage
      setCustomer(result.customer);
      localStorage.setItem("customer_data", JSON.stringify(result.customer));
      
      return { success: true };
    } catch (error) {
      console.error("Profile update error:", error);
      return { success: false, error: "Network error occurred" };
    }
  };

  const contextValue: AuthContextType = {
    customer,
    token,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!customer && !!token,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
