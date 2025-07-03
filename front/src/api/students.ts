export async function getAllStudents() {
  const API_URL = process.env.NEXT_PUBLIC_API_EDU_TRACE;

  const res = await fetch(`${API_URL}/students`, {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Erro ao processar requisição');
  }
  return data;
}