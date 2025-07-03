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
    throw new Error(data.detail || 'Erro ao fazer login');
  }

  localStorage.setItem('token', data.access_token);

  document.cookie = `token=${data.access_token}; path=/;`;

  return data;
}
