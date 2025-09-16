export async function updateUser(email: string, id_level: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_EDU_TRACE;

  const res = await fetch(`${API_URL}/users/${email}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify({
      id_level: Number(id_level)
    }),
  });

  const isJson = res.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await res.json() : null;

  if (!res.ok) {
    throw new Error(data?.detail || 'Erro ao processar requisição');
  }
  return data;
}
