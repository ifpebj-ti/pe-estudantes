export const PHASES = {
  TRIAGEM: 1,
  ANAMNESE: 2,
} as const;

export const LEVELS = {
  ADMIN: 1,
  ALUNO_ESTUDANTE: 2,
  PROFISSIONAL_EDUCACAO: 3,
  PROFISSIONAL_SAUDE: 4,
  PROFESSOR: 5,
} as const;

export type Phase = keyof typeof PHASES;
export type Level = keyof typeof LEVELS;
export type LevelValue = (typeof LEVELS)[Level];
