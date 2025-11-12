import { RegisterData } from "@/interfaces/RegisterData";

export async function login(email: string, password: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_EDU_TRACE;

  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Erro ao fazer login');
  }

  localStorage.setItem('token', data.access_token);

  document.cookie = `token=${data.access_token}; path=/;`;

  return data;
}

export async function register(registerData: RegisterData) {
  const API_URL = process.env.NEXT_PUBLIC_API_EDU_TRACE;

  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail || 'Erro ao processar requisição');
  }
  
  return data;
}