import { z } from 'zod';

export const EnderecoSchema = z.object({
  logradouro: z
    .string()
    .min(3, 'O logradouro deve ter pelo menos 3 caracteres.'),
  numero: z.string().max(10, 'Número inválido.').optional(),
  bairro: z.string().min(2, 'Bairro é obrigatório.'),
  cidade: z.string().min(2, 'Cidade é obrigatória.'),
  estado: z.string().min(2, 'Estado é obrigatório.'),
});

export type EnderecoDTO = z.infer<typeof EnderecoSchema>;

export const VitimaSchema = z.object({
  nome: z
    .string()
    .min(3, 'Nome é obrigatório e deve ter ao menos 3 caracteres.'),
  idade: z.number().min(0, 'Idade inválida.').optional(),
  observacao: z.string().optional(),
});

export type VitimaDTO = z.infer<typeof VitimaSchema>;

export const AcusadoSchema = z.object({
  nome: z
    .string()
    .min(3, 'Nome é obrigatório e deve ter ao menos 3 caracteres.'),
  idade: z.number().min(0, 'Idade inválida.').optional(),
  observacao: z.string().optional(),
});

export type AcusadoDTO = z.infer<typeof AcusadoSchema>;

export const DrogaSchema = z.object({
  tipo: z.string().min(2, 'Tipo é obrigatório.'),
  quantidade: z.number().positive('Quantidade deve ser positiva.'),
  unidadeMedida: z.enum(['GRAMAS', 'KG', 'LITROS', 'ML']),
});

export type DrogaDTO = z.infer<typeof DrogaSchema>;

export const ArmaSchema = z.object({
  tipo: z.string().min(2, 'Tipo é obrigatório.'),
  calibre: z.string().optional(),
  numeroSerie: z.string().optional(),
});

export type ArmaDTO = z.infer<typeof ArmaSchema>;

export const MunicaoSchema = z.object({
  calibre: z.string().min(1, 'Calibre é obrigatório.'),
  quantidade: z.number().positive('Quantidade deve ser positiva.'),
});

export type MunicaoDTO = z.infer<typeof MunicaoSchema>;

export const VeiculoSchema = z.object({
  placa: z.string().min(7, 'Placa deve ter no mínimo 7 caracteres.'),
  modelo: z.string().min(2, 'Modelo é obrigatório.'),
  situacao: z.enum(['APREENDIDO', 'RECUPERADO']),
});

export type VeiculoDTO = z.infer<typeof VeiculoSchema>;

export const OutroObjetoSchema = z.object({
  descricao: z.string().min(2, 'Descrição é obrigatória.'),
  quantidade: z.number().positive('Quantidade deve ser positiva.'),
});

export type OutroObjetoDTO = z.infer<typeof OutroObjetoSchema>;

export const DinheiroSchema = z.object({
  valor: z.number().positive('Valor deve ser positivo.'),
  moeda: z.enum(['BRL', 'USD', 'EUR']),
});

export type DinheiroDTO = z.infer<typeof DinheiroSchema>;

export const OcorrenciaSchema = z.object({
  m: z.string().min(3, 'Campo M é obrigatório.'),
  data: z.coerce.date({ required_error: 'Data é obrigatória.' }),
  horario: z.string().min(4, 'Horário é obrigatório.'),
  tipo: z.string().min(3, 'Tipo de ocorrência é obrigatório.'),
  resumo: z.string().min(5, 'Resumo é obrigatório.'),

  endereco: EnderecoSchema,

  vitimas: z.array(VitimaSchema).optional(),
  acusados: z.array(AcusadoSchema).optional(),
  drogas: z.array(DrogaSchema).optional(),
  municoes: z.array(MunicaoSchema).optional(),
  veiculos: z.array(VeiculoSchema).optional(),
  armas: z.array(ArmaSchema).optional(),
  outrosObjetos: z.array(OutroObjetoSchema).optional(),
  valoresApreendidos: z.array(DinheiroSchema).optional(),
});

export type OcorrenciaRequestDTO = z.infer<typeof OcorrenciaSchema>;

export type OcorrenciaResponseDTO = OcorrenciaRequestDTO & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
