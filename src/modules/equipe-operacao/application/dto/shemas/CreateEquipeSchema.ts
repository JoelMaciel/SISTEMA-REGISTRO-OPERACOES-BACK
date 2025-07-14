import { z } from 'zod';
import { PostoComandante } from '../../../domain/enums/posto-comandante.enum';
import { AtividadeRealizada } from '../../../domain/enums/atividade-realizada.enum';
import { LocalAtividade } from '../../../domain/enums/local-atividade.enum';
import { AreaAtuacao } from '../../../domain/enums/area-atuacao.enum';
import { TipoServico } from '../../../domain/enums/tipo-servico.enum';

const horaRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

export const CreateEquipeSchema = z.object({
  jaRespondeu: z.boolean(),
  email: z
    .string({ required_error: "O campo 'email' é obrigatório." })
    .email({ message: "O campo 'email' deve ser um endereço de email válido." })
    .max(50, { message: "O campo 'email' deve ter no máximo 50 caracteres." }),

  contatoEquipe: z
    .string({ required_error: "O campo 'contato' é obrigatório." })
    .min(8, { message: "O campo 'contato' deve ter no mínimo 8 caracteres." })
    .max(15, {
      message: "O campo 'contato' deve ter no máximo 15 caracteres.",
    }),

  dataOperacao: z.preprocess(
    (arg) => {
      if (typeof arg === 'string' || arg instanceof Date) {
        const date = new Date(arg);
        if (!isNaN(date.getTime())) {
          return date;
        }
      }
      return undefined;
    },
    z.date({
      required_error: 'O campo "dataOperacao" é obrigatório.',
      invalid_type_error: 'O campo "dataOperacao" deve ser uma data válida.',
    }),
  ),

  horarioInicial: z
    .string({ required_error: 'O campo "horarioInicial" é obrigatório.' })
    .regex(horaRegex, {
      message:
        'O campo "horarioInicial" deve estar no formato HH:mm (ex: 14:30).',
    }),

  horarioFinal: z
    .string({ required_error: 'O campo "horarioFinal" é obrigatório.' })
    .regex(horaRegex, {
      message:
        'O campo "horarioFinal" deve estar no formato HH:mm (ex: 18:45).',
    }),
  nomeOperacao: z.string().min(2),
  postoComandante: z.nativeEnum(PostoComandante),
  nomeGuerraComandante: z
    .string()
    .min(3, {
      message:
        "O campo 'nomeGuerraComandante' deve ter no mínimo 3 caracteres.",
    })
    .max(60, {
      message:
        "O campo 'nomeGuerraComandante' deve ter no máximo 60 caracteres.",
    }),

  matriculaComandante: z.string().min(6).max(12),
  opmGuarnicao: z
    .string()
    .min(2, {
      message: "O campo 'opmGuarnicao' deve ter no mínimo 2 caracteres.",
    })
    .max(30, {
      message: "O campo 'opmGuarnicao' deve ter no máximo 30 caracteres.",
    }),

  prefixoVtr: z
    .string()
    .min(2, {
      message: "O campo 'prefixoVtr' deve ter no mínimo 4 caracteres.",
    })
    .max(30, {
      message: "O campo 'numeroHt' deve ter no máximo 20 caracteres.",
    }),
  efetivoPolicial: z
    .number({
      required_error: "O campo 'efetivoPolicial' é obrigatório.",
      invalid_type_error:
        "O campo 'efetivoPolicial' deve ser um número inteiro.",
    })
    .int({ message: "O campo 'efetivoPolicial' deve ser um número inteiro." })
    .min(2, { message: 'O efetivo policial deve ter no mínimo 2 pessoas.' })
    .max(10, { message: 'O efetivo policial deve ter no máximo 10 pessoas.' }),

  atividadeRealizada: z.nativeEnum(AtividadeRealizada, {
    required_error: "O campo 'atividadeRealizada' é obrigatório.",
    invalid_type_error:
      "O campo 'atividadeRealizada' deve conter um valor válido.",
  }),

  localAtividade: z.nativeEnum(LocalAtividade, {
    required_error: "O campo 'localAtividade' é obrigatório.",
    invalid_type_error: "O campo 'localAtividade' deve conter um valor válido.",
  }),

  areaAtuacao: z.nativeEnum(AreaAtuacao, {
    required_error: "O campo 'areaAtuacao' é obrigatório.",
    invalid_type_error: "O campo 'areaAtuacao' deve conter um valor válido.",
  }),

  tipoServico: z.nativeEnum(TipoServico, {
    required_error: "O campo 'tipoServico' é obrigatório.",
    invalid_type_error: "O campo 'tipoServico' deve conter um valor válido.",
  }),

  numeroHt: z
    .string()
    .min(2, { message: "O campo 'numeroHt' deve ter no mínimo 2 caracteres." })
    .max(30, {
      message: "O campo 'numeroHt' deve ter no máximo 30 caracteres.",
    }),
});

export type CreateEquipeRequestDTO = z.infer<typeof CreateEquipeSchema>;
