'use client';

import { useEffect, useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { getAllCommentsByIdUser } from '@/api/comments';
import { useAuth } from '@/contexts/AuthContext';
import { CommentData } from '@/interfaces/CommentData';
import { decodeToken } from '@/services/auth/decodeToken';
import { formatarData } from '@/utils/formatDate';
import { ESTUDANTE } from '@/consts';

export default function ComentariosMultiprofissionais() {
  const [comentarios, setComentarios] = useState<CommentData[]>([]);
  const [novoComentario, setNovoComentario] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    async function carregarComentarios() {
      try {
        const token = decodeToken();
        if (token) {
          const data = await getAllCommentsByIdUser(token.sub);
          const ordenado = data.sort((a: CommentData, b: CommentData) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          setComentarios(ordenado);
        }
      } catch (err) {
        console.error("Erro ao buscar comentários:", err);
      }
    }

    carregarComentarios();
  }, []);

  if (loading) return null; //ADICIONAR COMPONENTE DE LOADING

  return (
    <AppLayout
      breadcrumbs={[
        { href: '/home', label: 'Página Inicial' },
        { href: '#', label: user?.name || 'Estudante' },
        { href: '/comentarios', label: 'Comentários Multiprofissionais' },
      ]}
    >
      <div className="p-6 space-y-8 w-full">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold mb-4">Comentários Multiprofissionais</h1>
          {user?.id_level !== ESTUDANTE && (
           <button
              className="bg-green-600 text-white px-4 py-2 rounded mb-4"
              onClick={() => setMostrarModal(true)}
            >
              Adicionar Comentário
            </button>     
          )}
        </div>

        {/* Lista de Comentários */}
        <div className="space-y-4">
          {comentarios.map((c, i) => (
            <div key={i} className="bg-white rounded shadow p-4">
              <p className="text-sm font-semibold">
                {c.author_name}
              </p>
              <p className="text-sm text-right text-gray-500">{formatarData(c.created_at)}</p>
              <p className="mt-2">{c.comment}</p>
            </div>
          ))}
        </div>

        {/* Modal */}
        {mostrarModal && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
            onClick={() => setMostrarModal(false)}>
            <div
              className="bg-white rounded p-6 w-full max-w-md shadow-lg"
              onClick={(e) => e.stopPropagation()}>
              <h2 className="text-lg font-semibold mb-4">Adicionar comentário</h2>
              <textarea
                className="w-full h-24 border border-gray-300 rounded p-2 resize-none"
                placeholder="Adicione um comentário"
                value={novoComentario}
                onChange={(e) => setNovoComentario(e.target.value)}
              />
              <div className="mt-4 flex justify-end gap-2">
                <button
                  className="px-4 py-2 border rounded text-gray-600"
                  onClick={() => setMostrarModal(false)}
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
