import { UnidadeMedida } from 'src/modules/ocorrencia/domain/enums/UnidadeMedida';
import { SituacaoVeiculo } from 'src/modules/ocorrencia/domain/enums/SituacaoVeiculo';
import { z } from 'zod';
import { cpf } from 'cpf-cnpj-validator';

const horaRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

const parseDate = (value: unknown): Date | undefined => {
  if (typeof value === 'string') {
    const [day, month, year] = value.split('/');
    if (day && month && year) {
      return new Date(`${year}-${month}-${day}T00:00:00`);
    }
  }
  return undefined;
};

export const EnderecoSchema = z.object({
  rua: z.string().min(3).max(150),
  numero: z.string().max(10).optional(),
  bairro: z.string().min(2).max(80),
  cidade: z.string().min(2).max(80),
  cep: z.string().min(5).max(15),
  uf: z.string().length(2),
  complemento: z.string().max(200).optional(),
});

export type EnderecoRequestDTO = z.infer<typeof EnderecoSchema>;

export const VitimaSchema = z.object({
  nome: z.string().min(3).max(100),
  cpf: z
    .string()
    .refine((value) => cpf.isValid(value), { message: 'CPF inválido' }),
  idade: z.number().int().min(0).max(120),
  dataNascimento: z.preprocess(
    parseDate,
    z.date({ required_error: 'Data de nascimento é obrigatória.' }),
  ),
  nomeMae: z.string().min(3).max(100).optional(),
  nomePai: z.string().min(3).max(100).optional(),
  naturalidade: z.string().min(2).max(40),
  nacionalidade: z.string().min(2).max(40),
  endereco: EnderecoSchema,
});

export type VitimaRequestDTO = z.infer<typeof VitimaSchema>;

export const AcusadoSchema = z.object({
  nome: z.string().min(3).max(100),
  cpf: z
    .string()
    .refine((value) => cpf.isValid(value), { message: 'CPF inválido' }),
  idade: z.number().int().min(0).max(120),
  dataNascimento: z.preprocess(
    parseDate,
    z.date({ required_error: 'Data de nascimento é obrigatória.' }),
  ),
  nomeMae: z.string().min(3).max(100).optional(),
  nomePai: z.string().min(3).max(100).optional(),
  naturalidade: z.string().min(2).max(50),
  nacionalidade: z.string().min(2).max(50),
  endereco: EnderecoSchema,
});

export type AcusadoRequestDTO = z.infer<typeof AcusadoSchema>;

export const DrogaSchema = z.object({
  tipo: z.string().min(2).max(100),
  quantidade: z.string().min(1).max(10),
  unidadeMedida: z.nativeEnum(UnidadeMedida),
});

export type DrogaRequestDTO = z.infer<typeof DrogaSchema>;

export const ArmaSchema = z.object({
  tipo: z.string().min(2).max(50),
  calibre: z.string().max(10),
  numeracao: z.string().max(20),
  capacidade: z.number().int().positive(),
});

export type ArmaRequestDTO = z.infer<typeof ArmaSchema>;

export const MunicaoSchema = z.object({
  calibre: z.string().min(1).max(25),
  quantidade: z.string().min(1).max(25),
});

export type MunicaoRequestDTO = z.infer<typeof MunicaoSchema>;

export const VeiculoSchema = z.object({
  marca: z.string().min(2).max(50),
  tipo: z.string().min(2).max(50),
  placa: z.string().min(7).max(10),
  modelo: z.string().min(2).max(50),
  cor: z.string().min(2).max(30),
  situacao: z.nativeEnum(SituacaoVeiculo),
});

export type VeiculoRequestDTO = z.infer<typeof VeiculoSchema>;

export const OutroObjetoSchema = z.object({
  descricao: z.string().min(2).max(2000),
});

export type OutroObjetoRequestDTO = z.infer<typeof OutroObjetoSchema>;

export const DinheiroSchema = z.object({
  valor: z.string().min(1).max(15),
});

export type DinheiroRequestDTO = z.infer<typeof DinheiroSchema>;

export const OcorrenciaSchema = z.object({
  m: z.string().min(1).max(50),
  data: z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) {
      const d = new Date(arg);
      if (!isNaN(d.getTime())) return d;
    }
    return undefined;
  }, z.date()),
  horario: z.string().regex(horaRegex),
  tipo: z.string().min(3).max(80),
  resumo: z.string().min(5).max(4000),
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
