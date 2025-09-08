import { z } from 'zod';
import { AreaAtuacaoSchema } from './AreaAtuacaoSchema';
import { PostoServicoSchema } from './PostoServicoSchema';

const dataRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-(19|20)\d\d$/;

export const CreateOperacaoSchema = z.object({
  nome: z
    .string({ required_error: "O campo 'nome' é obrigatório." })
    .min(2, { message: "O campo 'nome' deve ter no mínimo 2 caracteres." })
    .max(70, { message: "O campo 'nome' deve ter no máximo 70 caracteres." }),

  opmDemandante: z
    .string({ required_error: "O campo 'opmDemandante' é obrigatório." })
    .min(2, {
      message: "O campo 'opmDemandante' deve ter no mínimo 2 caracteres.",
    })
    .max(30, {
      message: "O campo 'opmDemandante' deve ter no máximo 30 caracteres.",
    }),

  dataInicial: z
    .string({ required_error: "O campo 'dataInicial' é obrigatório." })
    .regex(dataRegex, {
      message: "O campo 'dataInicial' deve estar no formato DD-MM-YYYY.",
    }),

  dataFinal: z
    .string({ required_error: "O campo 'dataFinal' é obrigatório." })
    .regex(dataRegex, {
      message: "O campo 'dataFinal' deve estar no formato DD-MM-YYYY.",
    }),

  efetivoPolicial: z
    .number({ required_error: "O campo 'efetivoPolicial' é obrigatório." })
    .int({ message: "O campo 'efetivoPolicial' deve ser um número inteiro." })
    .min(1, { message: "O campo 'efetivoPolicial' deve ser maior que zero." }),

  quantidadePostoArea: z
    .number({
      required_error: "O campo 'quantidadePostoArea' é obrigatório.",
    })
    .int({
      message: "O campo 'quantidadePostoArea' deve ser um número inteiro.",
    })
    .min(1, {
      message: "O campo 'quantidadePostoArea' deve ser maior que zero.",
    }),

  observacoes: z
    .string({ required_error: "O campo 'observacoes' é obrigatório." })
    .min(3, {
      message: "O campo 'observacoes' deve ter pelo menos 3 caracteres.",
    }),

  postoServico: z.array(PostoServicoSchema).optional(),

  areaAtuacao: z.array(AreaAtuacaoSchema).optional(),
});
export type CreateOperacaoRequestDTO = z.infer<typeof CreateOperacaoSchema>;
