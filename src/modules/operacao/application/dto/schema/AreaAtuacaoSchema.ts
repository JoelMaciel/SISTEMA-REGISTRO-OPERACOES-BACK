import { z } from 'zod';

export const AreaAtuacaoSchema = z.object({
  nome: z
    .string({ required_error: "O campo 'nome' é obrigatório." })
    .min(2, { message: "O campo 'nome' deve ter no mínimo 2 caracteres." })
    .max(120, { message: "O campo 'nome' deve ter no máximo 120 caracteres." }),
  local: z
    .string({ required_error: "O campo 'local' é obrigatório." })
    .min(2, { message: "O campo 'local' deve ter no mínimo 2 caracteres." })
    .max(120, {
      message: "O campo 'local' deve ter no máximo 120 caracteres.",
    }),
  quantidade: z
    .number({ required_error: "O campo 'quantidade' é obrigatório." })
    .min(2, { message: "O campo 'quantidade' deve ser pelo menos 2." }),
});

export type AreaAtuacaoDTO = z.infer<typeof AreaAtuacaoSchema>;
