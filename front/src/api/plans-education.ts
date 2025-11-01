import { PlansEducationData } from "@/interfaces/PlansEducationData";

export async function getPEIByEmail(email: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_EDU_TRACE;

  const res = await fetch(`${API_URL}/plans-education/${email}`, {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  
  if (!res.ok) {
    throw new Error(data.detail || 'Erro ao processar requisição');
  }
  return data;
}

export async function getAllPEIs() {
  const API_URL = process.env.NEXT_PUBLIC_API_EDU_TRACE;

  const res = await fetch(`${API_URL}/plans-education`, {
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

export async function postPEI(plansEducationData: PlansEducationData): Promise<PlansEducationData> {
  const API_URL = process.env.NEXT_PUBLIC_API_EDU_TRACE;

  const res = await fetch(`${API_URL}/plans-education`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(plansEducationData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Erro ao processar requisição');
  }

  return data;
}

export async function deletePEI(email: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_EDU_TRACE;

  const res = await fetch(`${API_URL}/plans-education/${email}`, {
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

export async function patchPEI(plansEducationData: PlansEducationData, email: string): Promise<PlansEducationData> {
  const API_URL = process.env.NEXT_PUBLIC_API_EDU_TRACE;

  const res = await fetch(`${API_URL}/plans-education/${email}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(plansEducationData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Erro ao processar requisição');
  }

  return data;
}