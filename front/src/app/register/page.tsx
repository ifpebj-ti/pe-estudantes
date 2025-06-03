// "use client";

// import dynamic from "next/dynamic";
// import Image from "next/image";
// import "@govbr-ds/core/dist/core.min.css";
// import { useState } from "react";

// // Importação dinâmica dos componentes BR
// const BrInput = dynamic(() =>
//   import("@govbr-ds-testing/webcomponents-react").then((mod) => mod.BrInput), { ssr: false }
// );

// const BrButton = dynamic(() =>
//   import("@govbr-ds-testing/webcomponents-react").then((mod) => mod.BrButton), { ssr: false }
// );

// export default function RegisterPage() {
//   const [formData, setFormData] = useState({
//     nome: "",
//     email: "",
//     cpf: "",
//     senha: "",
//     confirmarSenha: ""
//   });

//   const handleChange = (e: any) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="min-h-screen flex flex-row bg-gradient-to-r from-emerald-100 to-white">
//       <section className="items-center justify-center min-w-1/2 md:flex hidden">
//         <Image
//           src="/login.svg"
//           alt="Imagem login"
//           width={600}
//           height={400}
//           priority
//         />
//       </section>

//       <section className="h-screen flex flex-col items-center justify-between md:min-w-1/2 min-w-full py-4">
//         <div></div>

//         {/* Formulário de cadastro */}
//         <form className="p-8 w-full max-w-md space-y-6 flex flex-col items-center justify-center">
//           <h1 className="text-2xl font-bold text-center">Cadastro</h1>

//           <BrInput
//             label="Nome completo"
//             name="nome"
//             required
//             class="w-full"
//             onInput={handleChange}
//           >
//             <Image width={15} height={10} slot="icon" src="/user.svg" alt="Ícone nome" />
//           </BrInput>

//           <BrInput
//             label="Email"
//             type="email"
//             name="email"
//             required
//             pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
//             icon
//             class="w-full"
//             onInput={handleChange}
//           >
//             <Image width={15} height={10} slot="icon" src="/user.svg" alt="Ícone email" />
//           </BrInput>

//           <BrInput
//             label="CPF"
//             name="cpf"
//             required
//             pattern="[0-9]{11}"
//             icon
//             class="w-full"
//             onInput={handleChange}
//           >
//           </BrInput>

//           <BrInput
//             label="Senha"
//             type="password"
//             name="senha"
//             required
//             pattern=".{8,}"
//             icon
//             class="w-full"
//             onInput={handleChange}
//           >
//             <Image width={15} height={10} slot="icon" src="/locker.svg" alt="Ícone senha" />
//           </BrInput>

//           <BrInput
//             label="Confirmar Senha"
//             type="password"
//             name="confirmarSenha"
//             required
//             pattern=".{8,}"
//             icon
//             class="w-full"
//             onInput={handleChange}
//           >
//             <Image width={15} height={10} slot="icon" src="/locker.svg" alt="Ícone confirmar senha" />
//           </BrInput>

//           <BrButton
//             type="submit"
//             active
//             block
//             class="w-full"
//           >
//             Finalizar
//           </BrButton>
//         </form>

//         <div className="flex items-center justify-center w-full">
//           <a className="text-sm" href="/forgot-password">
//             Precisa de Ajuda?
//           </a>
//         </div>
//       </section>
//     </div>
//   );
// }
