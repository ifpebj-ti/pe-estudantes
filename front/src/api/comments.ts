import { CommentData } from "@/interfaces/CommentData";

export async function getAllCommentsByIdUser(id_user: number) {
  const API_URL = process.env.NEXT_PUBLIC_API_EDU_TRACE;

  const res = await fetch(`${API_URL}/comments/${id_user}`, {
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

export async function postComment(commentData: CommentData): Promise<CommentData> {
  const API_URL = process.env.NEXT_PUBLIC_API_EDU_TRACE;

  const res = await fetch(`${API_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(commentData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Erro ao processar requisição');
  }

  return data;
}