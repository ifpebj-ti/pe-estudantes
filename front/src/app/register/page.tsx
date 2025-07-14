"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import "@govbr-ds/core/dist/core.min.css";
import { Suspense, useState } from "react";
import { RegisterData } from "@/interfaces/RegisterData";
import { register } from "@/services/auth/login";
import { useRouter } from "next/navigation";

const BrInput = dynamic(() =>
  import("@govbr-ds-testing/webcomponents-react").then((mod) => mod.BrInput), { ssr: false }
);

const BrButton = dynamic(() =>
  import("@govbr-ds-testing/webcomponents-react").then((mod) => mod.BrButton), { ssr: false }
);

export default function RegisterPageWrapper() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <RegisterPage />
    </Suspense>
  );
}

function RegisterPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cpf: "",
    senha: "",
    confirmarSenha: ""
  });
  const router = useRouter();

  const handleChange = (e: React.FormEvent<HTMLBrInputElement>) => {
    const target = e.target as HTMLInputElement;
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    const cleanedCpf = formData.cpf.replace(/\D/g, ""); 

    const registerData: RegisterData = {
      full_name: formData.nome,
      email: formData.email,
      cpf: cleanedCpf,
      password: formData.senha,
    };

    try {
      const response = await register(registerData);
      if (!response) {
        throw new Error("Erro ao realizar o cadastro.");
      }
      alert("Cadastro realizado com sucesso!");
      router.push('/login');
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message || "Erro no cadastro.");
      } else {
        alert("Erro desconhecido no cadastro.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-row bg-gradient-to-r from-emerald-100 to-white">
      <section className="items-center justify-center min-w-1/2 md:flex hidden">
        <Image
          src="/login.svg"
          alt="Imagem login"
          width={728}
          height={562}
          priority
        />
      </section>

      <section className="h-screen flex flex-col items-center justify-between md:min-w-1/2 min-w-full py-4">
        <div></div>

        {/* Formulário de cadastro */}
        <form
          className="p-8 w-full max-w-md space-y-6 flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-bold text-center">Cadastro</h1>

          <BrInput
            label="Nome completo"
            name="nome"
            required
            class="w-full"
            onInput={handleChange}
          >
            <Image width={15} height={10} slot="icon" src="/user.svg" alt="Ícone nome" />
          </BrInput>

          <BrInput
            label="Email"
            type="email"
            name="email"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            icon
            class="w-full"
            onInput={handleChange}
          >
            <Image width={15} height={10} slot="icon" src="/user.svg" alt="Ícone email" />
          </BrInput>

          <BrInput
            label="CPF"
            name="cpf"
            required
            pattern="[0-9]{11}"
            icon
            class="w-full"
            onInput={handleChange}
          />

          <BrInput
            label="Senha"
            type="password"
            name="senha"
            required
            pattern=".{8,}"
            icon
            class="w-full"
            onInput={handleChange}
          >
            <Image width={15} height={10} slot="icon" src="/locker.svg" alt="Ícone senha" />
          </BrInput>

          <BrInput
            label="Confirmar Senha"
            type="password"
            name="confirmarSenha"
            required
            pattern=".{8,}"
            icon
            class="w-full"
            onInput={handleChange}
          >
            <Image width={15} height={10} slot="icon" src="/locker.svg" alt="Ícone confirmar senha" />
          </BrInput>

          <BrButton
            type="submit"
            active
            block
            class="w-full"
          >
            Finalizar
          </BrButton>
        </form>

        {/* <div className="flex items-center justify-center w-full">
          <a className="text-sm" href="/forgot-password">
            Precisa de Ajuda?
          </a>
        </div> */}
      </section>
    </div>
  );
}
