"use client";

import AppLayout from "@/components/AppLayout";
import TabelaEstudantes from "@/components/TabelaEstudantes";

export default function EstudantesPage() {
  return (
    <AppLayout
      breadcrumbs={[
        { href: "/home", label: "Página inicial" }
      ]}
    >
      <main className="p-6">
        <h1 className="text-2xl font-light mb-6">Estudantes</h1>
        <TabelaEstudantes />
      </main>
    </AppLayout>
  );
}
