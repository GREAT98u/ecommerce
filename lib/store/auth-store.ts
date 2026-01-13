import { create } from "zustand";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "User" | "Admin";
  avatar?: {
    url: string;
    public_id: string;
  } | null;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  authInitialized: boolean;

  setUser: (user: AuthUser) => void;
  clearAuth: () => void;
  markInitialized: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  authInitialized: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
      authInitialized: true,
    }),

  clearAuth: () =>
    set({
      user: null,
      isAuthenticated: false,
      authInitialized: true,
    }),

  markInitialized: () =>
    set({
      authInitialized: true,
    }),
}));
