import { z } from 'zod';
import { TipoServico } from '../../../domain/enums/tipo-servico.enum';
import { PostoComandante } from '../../../domain/enums/posto-comandante.enum';
import { AtividadeRealizada } from '../../../domain/enums/atividade-realizada.enum';

const horaRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

export const CreateEquipeSchema = z.object({
  email: z
    .string({ required_error: "O campo 'email' é obrigatório." })
    .email({ message: "O campo 'email' deve ser um endereço de email válido." })
    .max(50),

  contatoEquipe: z
    .string({ required_error: "O campo 'contatoEquipe' é obrigatório." })
    .min(8)
    .max(15),

  dataOperacao: z.coerce.date({
    required_error: 'O campo "dataOperacao" é obrigatório.',
    invalid_type_error: 'O campo "dataOperacao" deve ser uma data válida.',
  }),

  horarioInicial: z
    .string({ required_error: 'O campo "horarioInicial" é obrigatório.' })
    .regex(horaRegex, {
      message: 'Deve estar no formato HH:mm (ex: 14:30).',
    }),

  horarioFinal: z
    .string({ required_error: 'O campo "horarioFinal" é obrigatório.' })
    .regex(horaRegex, {
      message: 'Deve estar no formato HH:mm (ex: 18:45).',
    }),

  nomeOperacao: z.string().min(2),

  postoComandante: z.nativeEnum(PostoComandante),

  postoAreaId: z
    .string({ required_error: "O campo 'postoAreaId' é obrigatório." })
    .uuid(),

  nomeGuerraComandante: z.string().min(3).max(60),

  matriculaComandante: z.string().min(6).max(12),

  opmGuarnicao: z.string().min(2).max(30),

  prefixoVtr: z.string().min(2).max(30),

  efetivoPolicial: z.number().int().min(2).max(10),

  atividadeRealizada: z.nativeEnum(AtividadeRealizada),

  tipoServico: z.nativeEnum(TipoServico),

  numeroHt: z.string().min(2).max(30),
});

export type CreateEquipeRequestDTO = z.infer<typeof CreateEquipeSchema>;
