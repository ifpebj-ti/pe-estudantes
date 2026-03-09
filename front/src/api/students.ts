import { getApiUrl } from "@/utils/runtimeApiUrl";

export async function getAllStudents() {
  const API_URL = getApiUrl();

  const res = await fetch(`${API_URL}/users`, {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  });

  const isJson = res.headers.get('content-type')?.includes('application/json');

  const data = isJson ? await res.json() : null;

  if (!res.ok) {
    throw new Error(data.detail || 'Erro ao processar requisição');
  }
  return data;
}