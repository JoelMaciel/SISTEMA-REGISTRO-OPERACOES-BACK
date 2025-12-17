import { StatusAlteracao } from 'src/modules/relatorio/domain/enums/statusAlteracao';
import { z } from 'zod';

export const AspectoPositivoSchema = z.object({
  descricao: z.string().min(5, 'A descrição deve ter no mínimo 5 caracteres.'),
});

export const MelhoriaIdentificadaSchema = z.object({
  descricao: z.string().min(5, 'A descrição deve ter no mínimo 5 caracteres.'),
});

export const AlteracaoEfetivoSchema = z.object({
  status: z.nativeEnum(StatusAlteracao, {
    required_error: "O campo 'status' é obrigatório.",
  }),
  descricao: z.string().min(5, 'A descrição deve ter no mínimo 5 caracteres.'),
});
export const OutraAlteracaoSchema = z.object({
  descricao: z.string().min(5, 'A descrição deve ter no mínimo 5 caracteres.'),
});

export const CreateRelatorioSchema = z.object({
  dataInicial: z.coerce.date({
    invalid_type_error: 'A data inicial deve ser uma data válida.',
  }),
  dataFinal: z.coerce.date({
    invalid_type_error: 'A data final deve ser uma data válida.',
  }),
  horarioInicial: z
    .string()
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      'Horário inicial inválido (formato HH:MM).',
    ),
  horarioFinal: z
    .string()
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      'Horário final inválido (formato HH:MM).',
    ),
  local: z
    .string()
    .min(5, 'O local deve ter no mínimo 5 caracteres.')
    .max(100, 'O local deve ter no máximo 100 caracteres.'),

  operacaoId: z.string().uuid('operacaoId deve ser um UUID válido.'),
  fiscalId: z.string().uuid('fiscalId deve ser um UUID válido.'),

  aspectosPositivos: z.array(AspectoPositivoSchema).optional(),
  melhoriasIdentificadas: z.array(MelhoriaIdentificadaSchema).optional(),
  alteracoesEfetivo: z.array(AlteracaoEfetivoSchema).optional(),
  outrasAlteracoes: z.array(OutraAlteracaoSchema).optional(),
});

export type CreateRelatorioRequestDTO = z.infer<typeof CreateRelatorioSchema>;
