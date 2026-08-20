import api from "../utils/api";

export interface RegisterPayload {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  role?: "candidate" | "employer" | "admin";
}

export interface LoginPayload {
  email: string; // can be email or mobile
  password: string;
}

export interface UserProfile {
  _id: string;
  fullName: string;
  email: string;
  mobile: string;
  role: "candidate" | "employer" | "admin";
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: UserProfile;
  };
}

export const registerApi = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/register", payload);
  return response.data;
};

export const loginApi = async (payload: LoginPayload): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", payload);
  return response.data;
};

export const getMeApi = async (): Promise<{ success: boolean; data: { user: UserProfile } }> => {
  const response = await api.get("/auth/me");
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("user");
};

export const saveAuthData = (token: string, user: UserProfile) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", user.role);
  localStorage.setItem("user", JSON.stringify(user));
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem("token");
};

export const getStoredUser = (): UserProfile | null => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const getInitials = (name?: string): string => {
  if (!name) return "AM";
  const words = name.trim().split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};
