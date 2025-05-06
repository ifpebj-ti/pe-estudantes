"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Image from "next/image";
import "@govbr-ds/core/dist/core.min.css";

// Importação dinâmica para evitar erro de hydration
const BrInput = dynamic(() =>
  import("@govbr-ds-testing/webcomponents-react").then((mod) => mod.BrInput), { ssr: false }
);

const BrButton = dynamic(() =>
  import("@govbr-ds-testing/webcomponents-react").then((mod) => mod.BrButton), { ssr: false }
);

export default function LoginPage() {
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/");
      const data = await response.text();
      setMensagem(data);
    } catch (error) {
      setMensagem("Erro ao conectar com o servidor.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-row bg-gradient-to-r from-emerald-100 to-white">
      <section className="items-center justify-center min-w-1/2 md:flex hidden">
        <Image
          src="/login.svg"
          alt="Imagem login"
          width={600}
          height={400}
          priority
        />
      </section>

      <section className="h-screen flex flex-col items-center justify-between md:min-w-1/2 min-w-full py-4">
        <div></div>
        <form
          onSubmit={handleSubmit}
          className="p-8 w-full max-w-md space-y-6 flex flex-col items-center justify-center"
        >
          <h1 className="text-2xl font-bold text-center">Login</h1>

          <BrInput
            label="Email"
            type="email"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            icon
            class="w-full"
          >
            <Image width={15} height={10} slot="icon" src="/user.svg" alt="Ícone usuário" />
          </BrInput>

          <BrInput
            label="Senha"
            type="password"
            required
            pattern="[0-9]{8,11}"
            icon
            class="w-full"
          >
            <Image width={15} height={10} slot="icon" src="/locker.svg" alt="Ícone senha" />
          </BrInput>

          <div className="flex items-center justify-end w-full">
            <a className="text-sm" href="/forgot-password">
              Esqueceu a senha?
            </a>
          </div>

          <BrButton
            type="submit"
            active
            block
            class="w-full"
          >
            Entrar
          </BrButton>

          {/* Exibição da resposta da API */}
          {mensagem && (
            <p className="text-center text-sm text-green-700">{mensagem}</p>
          )}

          <div className="flex items-center justify-center w-full">
            <a className="text-lg" href="/forgot-password">
              Primeiro Acesso?
            </a>
          </div>
        </form>

        <div className="flex items-center justify-center w-full">
          <a className="text-sm" href="/forgot-password">
            Precisa de Ajuda?
          </a>
        </div>
      </section>
    </div>
  );
}
