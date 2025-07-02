'use client';

import { useState } from 'react';
import AppLayout from '@/components/AppLayout'; // Caminho pode variar conforme estrutura do seu projeto

interface Comentario {
  autor: string;
  data: string;
  texto: string;
}

export default function ComentariosMultiprofissionais() {
  const [comentarios, setComentarios] = useState<Comentario[]>([
    {
      autor: 'João Almeida e Silva - Professor',
      data: '13/05/2025 às 20h30',
      texto:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna...',
    },
  ]);

  const [novoComentario, setNovoComentario] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);

  function adicionarComentario() {
    if (!novoComentario.trim()) return;

    const novo: Comentario = {
      autor: 'Você - Profissional',
      data: new Date().toLocaleString('pt-BR'),
      texto: novoComentario.trim(),
    };

    setComentarios([novo, ...comentarios]);
    setNovoComentario('');
    setMostrarModal(false);
  }

  return (
    <AppLayout
        breadcrumbs={[
          { href: '/home', label: 'Página Inicial' },
          { href: '/joao-bosco', label: 'João Bosco de Siqueira Filho' },
          { href: '/comentarios', label: 'Comentários Multiprofissionais' },
        ]}
    >
      <div className='p-6 space-y-8 w-full'>
          <div className='flex justify-between'>
              <h1 className="text-4xl font-bold mb-4">Comentários Multiprofissionais</h1>
              {/* Botão Adicionar */}
              <button
                className="bg-green-600 text-white px-4 py-2 rounded mb-4"
                onClick={() => setMostrarModal(true)}
              >
                Adicionar Comentário
              </button>
          </div>
          {/* Lista de Comentários */}
          <div className="space-y-4">
            {comentarios.map((c, i) => (
              <div key={i} className="bg-white rounded shadow p-4">
                <p className="text-sm font-semibold">{c.autor}</p>
                <p className="text-sm text-right text-gray-500">{c.data}</p>
                <p className="mt-2">{c.texto}</p>
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
                    onClick={adicionarComentario}
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
