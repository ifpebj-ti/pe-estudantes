import { Suspense } from "react";
import VisualizarEstudanteClient from "./VisualizarEstudanteClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <VisualizarEstudanteClient />
    </Suspense>
  );
}
