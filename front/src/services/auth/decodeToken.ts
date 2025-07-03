import { jwtDecode } from "jwt-decode";

export type TokenPayload = {
  sub: number;
  email: string;
  name: string;
  id_level: number;
  iat: number;
  exp: number;
};

export function decodeToken(): TokenPayload | null {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    return jwtDecode<TokenPayload>(token);
  } catch (err) {
    console.error("Token inválido:", err);
    return null;
  }
}