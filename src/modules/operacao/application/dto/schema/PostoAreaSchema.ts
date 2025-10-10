import { z } from 'zod';

export const PostoAreaSchema = z.object({
  nome: z
    .string({ required_error: "O campo 'nome' é obrigatório." })
    .min(2, { message: "O campo 'nome' deve ter no mínimo 3 caracteres." })
    .max(120, { message: "O campo 'nome' deve ter no máximo 120 caracteres." }),

  local: z
    .string({ required_error: "O campo 'local' é obrigatório." })
    .min(2, { message: "O campo 'local' deve ter no mínimo 4 caracteres." })
    .max(120, {
      message: "O campo 'local' deve ter no máximo 120 caracteres.",
    }),

  numero: z
    .string()
    .max(30, { message: "O campo 'número' deve ter no máximo 30 caracteres." })
    .optional(),

  bairro: z
    .string()
    .max(120, {
      message: "O campo 'bairro' deve ter no máximo 120 caracteres.",
    })
    .optional(),

  cidade: z
    .string({ required_error: "O campo 'cidade' é obrigatório." })
    .min(2, { message: "O campo 'cidade' deve ter no mínimo 4 caracteres." })
    .max(120, {
      message: "O campo 'cidade' deve ter no máximo 120 caracteres.",
    }),

  quantidade: z
    .number({ required_error: "O campo 'quantidade' é obrigatório." })
    .min(1, { message: "O campo 'quantidade' deve ser pelo menos 1." }),
});

export const PostoAreaArraySchema = z.union([
  PostoAreaSchema,
  z.array(PostoAreaSchema),
]);

export type PostoAreaRequestDTO = z.infer<typeof PostoAreaSchema>;
