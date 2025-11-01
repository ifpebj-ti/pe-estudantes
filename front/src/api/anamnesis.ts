import { AnamnesisData } from "../interfaces/AnamnesisData";

export async function getAnamneseByEmail(email: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_EDU_TRACE;

  const res = await fetch(`${API_URL}/anamnesis/${email}`, {
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

export async function getAllAnamneses() {
  const API_URL = process.env.NEXT_PUBLIC_API_EDU_TRACE;

  const res = await fetch(`${API_URL}/anamnesis`, {
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

export async function postAnamneses(anamneseData: AnamnesisData): Promise<AnamnesisData> {
  const API_URL = process.env.NEXT_PUBLIC_API_EDU_TRACE;

  const res = await fetch(`${API_URL}/anamnesis`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(anamneseData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Erro ao processar requisição');
  }

  return data;
}

export async function deleteAnamnesis(email: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_EDU_TRACE;

  const res = await fetch(`${API_URL}/anamnesis/${email}`, {
    method: 'DELETE',
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

export async function patchAnamnesis(anamneseData: AnamnesisData, email: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_EDU_TRACE;

  const res = await fetch(`${API_URL}/anamnesis/${email}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(anamneseData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Erro ao processar requisição');
  }

  return data;
}