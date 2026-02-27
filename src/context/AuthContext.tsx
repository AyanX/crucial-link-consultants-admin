import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import type { AuthContextValue, AuthUser, LoginPayload } from '../types';
import axios from 'axios';

const BASE_URL = 'http://localhost:9000/api';
const STORAGE_KEY = 'clc_auth_user';

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser]         = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [initials, setInitials] = useState<string>("");
  // ── Rehydrate session on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: AuthUser = JSON.parse(stored);
        setUser(parsed);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ── Login
  const login = useCallback(async (
    payload: LoginPayload,
    onError: (msg: string) => void,
  ) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        credentials:"include",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message ?? `Login failed (${res.status})`);
      }

      const userRes = await res.json();

      const data: AuthUser = userRes.user;
      setUser(data);

      const initials:string =userRes?.initials
      setInitials(initials)
        // store session in localStorage for persistence
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      
    } catch (e: unknown) {
      onError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    }
  }, []);

  // ── Logout
  const logout = useCallback(async () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true }).catch(() => {})
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      initials,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};