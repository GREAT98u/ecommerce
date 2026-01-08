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
  setUser: (user: AuthUser | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: Boolean(user),
    }),

  clearAuth: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));
