"use client";

import { getReportByEmail } from "@/api/reports";
import { ReportsData } from "@/interfaces/ReportsData";
import { useEffect, useState, useRef } from "react"; // 1. Importar useRef
import * as XLSX from 'xlsx';
import Link from 'next/link';

type ExportReportProps = {
    email: string | null;
    nome: string | null;
}

export default function ExportReport({ email, nome }: ExportReportProps) {
    const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
    const [errorMessage, setErrorMessage] = useState('');

    // 2. Criar uma referência para controlar a execução
    const effectRan = useRef(false);

    useEffect(() => {
        // 3. Verificar se o efeito já rodou
        // Em Strict Mode, na segunda montagem, effectRan.current será true.
        if (effectRan.current === true) {
            return; // Interrompe a execução do efeito
        }

        // Função auto-executável para iniciar o processo
        (async () => {
            if (!email) {
                setErrorMessage("E-mail do estudante não fornecido. Não é possível exportar.");
                setStatus('error');
                return;
            }

            try {
                // ... (toda a sua lógica de busca e geração de Excel permanece exatamente a mesma)
                const report: ReportsData = await getReportByEmail(email);
                if (!report) {
                    setErrorMessage("Não foram encontrados dados de relatório para este estudante.");
                    setStatus('error');
                    return;
                }

                const objectToKeyValue = (obj: any, prefix = ''): { Chave: string; Valor: string }[] => {
                    let results: { Chave: string; Valor: string }[] = [];
                    for (const key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key)) {
                            const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                            const newKey = prefix ? `${prefix} -> ${formattedKey}` : formattedKey;
                            const value = obj[key];
                            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                                results = results.concat(objectToKeyValue(value, newKey));
                            } else {
                                let displayValue: string;
                                if (typeof value === 'boolean') displayValue = value ? 'Sim' : 'Não';
                                else if (value === null || value === undefined || value === '') displayValue = 'Não informado';
                                else displayValue = String(value);
                                results.push({ Chave: newKey, Valor: displayValue });
                            }
                        }
                    }
                    return results;
                };

                const wsScreening = XLSX.utils.json_to_sheet(objectToKeyValue(report.screening), { header: ["Chave", "Valor"] });
                wsScreening['!cols'] = [{ wch: 50 }, { wch: 50 }];
                const wsAnamnesis = XLSX.utils.json_to_sheet(objectToKeyValue(report.anamnesis), { header: ["Chave", "Valor"] });
                wsAnamnesis['!cols'] = [{ wch: 50 }, { wch: 50 }];
                const wsPlansEducation = XLSX.utils.json_to_sheet(objectToKeyValue(report.plansEducation), { header: ["Chave", "Valor"] });
                wsPlansEducation['!cols'] = [{ wch: 50 }, { wch: 50 }];

                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, wsScreening, "Triagem");
                XLSX.utils.book_append_sheet(workbook, wsAnamnesis, "Anamnese Completa");
                XLSX.utils.book_append_sheet(workbook, wsPlansEducation, "Plano Educacional");

                const studentName = report.screening?.full_name || 'estudante';
                const fileName = `Relatorio_${studentName.replace(/\s+/g, '_')}.xlsx`;
                XLSX.writeFile(workbook, fileName);

                setStatus('success');

            } catch (error) {
                console.error("Erro ao gerar relatório:", error);
                setErrorMessage("Ocorreu um erro inesperado ao gerar o relatório.");
                setStatus('error');
            }
        })();

        // 4. Marcar que o efeito rodou
        // Esta função de cleanup só roda na desmontagem do componente.
        return () => {
            effectRan.current = true;
        };

    }, [email]); // A dependência permanece a mesma

    // ... (o JSX de renderização condicional permanece o mesmo)
    if (status === 'processing') {
        return (
            <div className="p-6 text-center">
                <p className="text-lg font-medium">Gerando relatório, por favor aguarde...</p>
                <p className="text-gray-600">O download começará em breve.</p>
            </div>
        );
    }
    // ... etc
    if (status === 'success') {
        return (
            <div className="p-6 text-center">
                <h2 className="text-xl font-bold text-green-700">Relatório Gerado com Sucesso!</h2>
                <p className="text-gray-600 mt-2">O download do arquivo Excel deve ter começado.</p>
                <Link href={`/estudantes/visualizar?email=${email}&nome=${nome}`} className="br-button primary mt-6 inline-block">
                    Voltar para a Página do Estudante
                </Link>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="p-6 text-center">
                <h2 className="text-xl font-bold text-red-700">Falha ao Gerar Relatório</h2>
                <p className="text-gray-600 mt-2">{errorMessage}</p>
                <Link href={`/estudantes/visualizar?email=${email}&nome=${nome}`} className="br-button secondary mt-6 inline-block">
                    Voltar para a Página do Estudante
                </Link>
            </div>
        );
    }

    return null;
}
