// "use client";

// import dynamic from "next/dynamic";
// import { useState } from "react";
// import Image from "next/image";
// import "@govbr-ds/core/dist/core.min.css";

// // Importações dinâmicas
// const BrInput = dynamic(() =>
//   import("@govbr-ds-testing/webcomponents-react").then((mod) => mod.BrInput), { ssr: false }
// );

// const BrButton = dynamic(() =>
//   import("@govbr-ds-testing/webcomponents-react").then((mod) => mod.BrButton), { ssr: false }
// );

// export default function NewPasswordPage() {
//   const [formData, setFormData] = useState({
//     senha: "",
//     confirmarSenha: ""
//   });

//   const [mensagem, setMensagem] = useState("");

//   setMensagem("Sua senha foi alterada com sucesso!");
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

//         {/* Formulário de nova senha */}
//         <form className="p-8 w-full max-w-md space-y-6 flex flex-col items-center justify-center">
//           <h1 className="text-2xl font-bold text-center">Nova Senha</h1>

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

//           {mensagem && (
//             <p className="text-center text-sm text-green-700">{mensagem}</p>
//           )}
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
