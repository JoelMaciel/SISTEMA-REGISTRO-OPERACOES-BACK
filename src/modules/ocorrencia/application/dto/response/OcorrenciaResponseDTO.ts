// src/modules/ocorrencia/dto/response/OcorrenciaResponseDTO.ts

import { Ocorrencia } from 'src/modules/ocorrencia/domain/entities/ocorrencia';

export class OcorrenciaResponseDTO {
  id: string;
  m: string;
  data: Date;
  horario: string;
  tipo: string;
  resumo: string;
  endereco: {
    id?: string;
    rua: string;
    numero?: string;
    bairro: string;
    cidade: string;
    uf: string;
  } | null;
  vitimas: {
    id?: string;
    nome: string;
    cpf: string;
    idade?: number;
    dataNascimento: Date;
    nomeMae: string;
    nomePai: string;
    naturalidade: string;
    nacionalidade: string;
  }[];
  acusados: {
    id?: string;
    nome: string;
    idade: number;
    cpf: string;
    dataNascimento: Date;
    nomaMae: string;
    nomePai: string;
    naturalidade: string;
    nacionalidade: string;
    observacao?: string;
  }[];
  drogas: {
    id?: string;
    tipo: string;
    quantidade: string;
    unidadeMedida: string;
  }[];
  municoes: {
    id?: string;
    calibre: string;
    quantidade: string;
  }[];
  veiculos: {
    id?: string;
    marca: string;
    tipo: string;
    placa: string;
    modelo: string;
    cor: string;
    situacao: string;
  }[];
  armas: {
    id?: string;
    tipo: string;
    calibre: string;
    numeracao: string;
    capacidade: number;
  }[];
  outrosObjetos: {
    id?: string;
    descricao: string;
  }[];
  valoresApreendidos: {
    id?: string;
    valor: string;
  }[];
  createdAt?: Date;
  updatedAt?: Date;

  constructor(ocorrencia: Ocorrencia) {
    this.id = ocorrencia.id;
    this.m = ocorrencia.m;
    this.data = ocorrencia.data;
    this.horario = ocorrencia.horario;
    this.tipo = ocorrencia.tipo;
    this.resumo = ocorrencia.resumo;

    this.endereco = ocorrencia.endereco
      ? {
          id: (ocorrencia.endereco as any).id,
          rua: ocorrencia.endereco.rua,
          numero: ocorrencia.endereco.numero,
          bairro: ocorrencia.endereco.bairro,
          cidade: ocorrencia.endereco.cidade,
          uf: ocorrencia.endereco.uf,
        }
      : null;

    this.vitimas = ocorrencia.vitimas
      ? ocorrencia.vitimas.map((v) => ({
          id: (v as any).id,
          nome: v.nome,
          idade: v.idade,
          cpf: v.cpf,
          dataNascimento: v.dataNascimento ? new Date(v.dataNascimento) : null,
          nomeMae: v.nomeMae,
          nomePai: v.nomePai,
          naturalidade: v.naturalidade,
          nacionalidade: v.nacionalidade,
        }))
      : [];

    this.acusados = ocorrencia.acusados
      ? ocorrencia.acusados.map((a) => ({
          id: (a as any).id,
          nome: a.nome,
          idade: a.idade,
          cpf: a.cpf,
          dataNascimento: a.dataNascimento ? new Date(a.dataNascimento) : null,
          nomaMae: a.nomeMae,
          nomePai: a.nomePai,
          naturalidade: a.naturalidade,
          nacionalidade: a.nacionalidade,
        }))
      : [];

    this.drogas = ocorrencia.drogas
      ? ocorrencia.drogas.map((d) => ({
          id: (d as any).id,
          tipo: d.tipo,
          quantidade: d.quantidade,
          unidadeMedida: d.unidadeMedida,
        }))
      : [];

    this.municoes = ocorrencia.municoes
      ? ocorrencia.municoes.map((m) => ({
          id: (m as any).id,
          calibre: m.calibre,
          quantidade: m.quantidade,
        }))
      : [];

    this.veiculos = ocorrencia.veiculos
      ? ocorrencia.veiculos.map((v) => ({
          id: (v as any).id,
          marca: v.marca,
          tipo: v.tipo,
          placa: v.placa,
          modelo: v.modelo,
          cor: v.cor,
          situacao: v.situacao,
        }))
      : [];

    this.armas = ocorrencia.armas
      ? ocorrencia.armas.map((a) => ({
          id: (a as any).id,
          tipo: a.tipo,
          calibre: a.calibre,
          numeracao: a.numeracao,
          capacidade: a.capacidade,
        }))
      : [];

    this.outrosObjetos = ocorrencia.outrosObjetos
      ? ocorrencia.outrosObjetos.map((o) => ({
          id: (o as any).id,
          descricao: o.descricao,
        }))
      : [];

    this.valoresApreendidos = ocorrencia.valoresApreendidos
      ? ocorrencia.valoresApreendidos.map((d) => ({
          id: (d as any).id,
          valor: d.valor,
        }))
      : [];

    this.createdAt = ocorrencia.createdAt;
    this.updatedAt = ocorrencia.updatedAt;
  }
}
