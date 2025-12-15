import { PostoComandante } from 'src/modules/equipe/domain/enums/posto-comandante.enum';
import { z } from 'zod';

export const CreateFiscalSchema = z.object({
  postoGraduacao: z.nativeEnum(PostoComandante, {
    required_error: "O campo 'postoComandante' é obrigatório.",
    invalid_type_error:
      "O campo 'postoComandante' deve ser um dos valores válidos do PostoComandante.",
  }),

  nome: z
    .string({ required_error: "O campo 'nome' é obrigatório." })
    .min(3, 'O nome deve ter no mínimo 3 caracteres.')
    .max(40, 'O nome deve ter no máximo 40 caracteres.'),

  matricula: z
    .string({ required_error: "O campo 'matricula' é obrigatório." })
    .min(4, 'A matrícula deve ter no mínimo 4 caracteres.')
    .max(40, 'A matrícula deve ter no máximo 40 caracteres.'),

  opm: z
    .string({ required_error: "O campo 'opm' é obrigatório." })
    .min(2, 'A OPM deve ter no mínimo 2 caracteres.')
    .max(40, 'A OPM deve ter no máximo 40 caracteres.'),
});

export type CreateFiscalRequestDTO = z.infer<typeof CreateFiscalSchema>;
