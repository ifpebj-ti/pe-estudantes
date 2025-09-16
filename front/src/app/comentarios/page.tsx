'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import AppLayout from '@/components/AppLayout';
// Importe a função de POST junto com a de GET
import { getAllCommentsByIdUser, postComment } from '@/api/comments'; 
import { useAuth } from '@/contexts/AuthContext';
import { CommentData } from '@/interfaces/CommentData';
import { decodeToken } from '@/services/auth/decodeToken';
import { formatarData } from '@/utils/formatDate';
import { ESTUDANTE } from '@/consts';
import { useSearchParams, useRouter } from 'next/navigation'; // Importe useRouter

export default function ComentariosMultiprofissionaisPageWrapper() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ComentariosMultiprofissionais />
    </Suspense>
  );
}

function ComentariosMultiprofissionais() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const nome = searchParams.get("nome");
  const router = useRouter(); // Adicione o router para navegação

  const [targetId, setTargetId] = useState<number | null>(null);
  const [comentarios, setComentarios] = useState<CommentData[]>([]);
  const [novoComentario, setNovoComentario] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const { user, loading } = useAuth();
  const [isStudent, setIsStudent] = useState(true);

  const carregarComentarios = useCallback(async () => {
    try {
      const token = decodeToken();
      if (!token) {
        router.push('/login');
        return;
      }

      const userIsStudent = token.id_level === ESTUDANTE;
      setIsStudent(userIsStudent);

      // O ID do usuário alvo é o do estudante (seja pelo 'id' da URL ou pelo token do próprio estudante)

      if (userIsStudent) {
        setTargetId(token.sub);
      } else {
        setTargetId((id ? +id : null));
      }

      if (targetId) {
        const data = await getAllCommentsByIdUser(targetId);
        const ordenado = data.sort((a: CommentData, b: CommentData) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setComentarios(ordenado);
      }
    } catch (err) {
      console.error("Erro ao buscar comentários:", err);
      setComentarios([]); // Garante que a lista fique vazia em caso de erro
    }
  }, [id, targetId, router]); // Add all dependencies used inside the function

  useEffect(() => {
    carregarComentarios();
  }, [carregarComentarios]); // Now we can safely add it to dependencies
  // Função para lidar com a submissão do novo comentário
  const handleAdicionarComentario = async () => {
    // Validação dos dados necessários
    if (!novoComentario.trim()) {
      alert('O comentário não pode estar vazio.');
      return;
    }
    if (!user || !id) {
      alert('Não foi possível identificar o autor ou o destinatário do comentário.');
      return;
    }

    // Monta o payload de acordo com a interface CommentData
    const commentData: Omit<CommentData, 'created_at'> = {
      comment: novoComentario,
      id_user: +id, // ID do estudante (alvo do comentário)
      id_author: user.sub, // ID do professor/profissional que está escrevendo
      author_name: user.name, // Nome do autor
    };

    try {
      const comentarioSalvo = await postComment(commentData as CommentData); // Envia para a API
      
      // Atualiza a UI de forma otimista
      setComentarios([comentarioSalvo, ...comentarios]);
      
      // Limpa o formulário e fecha o modal
      setNovoComentario('');
      setMostrarModal(false);
      alert('Comentário adicionado com sucesso!');

    } catch (error) {
      console.error("Erro ao postar comentário:", error);
      alert("Falha ao adicionar o comentário. Verifique o console para mais detalhes.");
    }
  };

  if (loading) return <h1>Carregando...</h1>;

  return (
    <AppLayout
      breadcrumbs={[
        { href: '/home', label: 'Página Inicial' },
        { href: '#', label: nome || 'Estudante' },
        { href: '/comentarios', label: 'Comentários Multiprofissionais' },
      ]}
    >
      <div className="p-6 space-y-8 w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Comentários Multiprofissionais</h1>
          {!isStudent && (
           <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={() => setMostrarModal(true)}
            >
              Adicionar Comentário
            </button>     
          )}
        </div>

        {/* Lista de Comentários */}
        <div className="space-y-4">
          {comentarios.length > 0 ? (
            comentarios.map((c, i) => (
              <div key={i} className="bg-white rounded shadow p-4">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-semibold text-gray-800">
                    {c.author_name}
                  </p>
                  <p className="text-xs text-gray-500">{formatarData(c.created_at)}</p>
                </div>
                <p className="mt-2 text-gray-700">{c.comment}</p>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-10">
              <p>Nenhum comentário encontrado para este estudante.</p>
            </div>
          )}
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
                className="w-full h-24 border border-gray-300 rounded p-2 resize-none focus:ring-2 focus:ring-blue-500"
                placeholder="Escreva seu comentário aqui..."
                value={novoComentario}
                onChange={(e) => setNovoComentario(e.target.value)}
              />
              <div className="mt-4 flex justify-end gap-2">
                <button
                  className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                  onClick={() => setMostrarModal(false)}
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={handleAdicionarComentario} // Chama a função de submissão
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
