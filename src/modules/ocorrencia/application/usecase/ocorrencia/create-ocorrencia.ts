import { Inject, Injectable } from '@nestjs/common';
import { Dinheiro } from 'src/modules/ocorrencia/domain/entities/dinheiro';
import { OutroObjeto } from 'src/modules/ocorrencia/domain/entities/outroObjeto';
import { Arma } from 'src/modules/ocorrencia/domain/entities/arma';
import { Veiculo } from 'src/modules/ocorrencia/domain/entities/veiculo';
import { Municao } from 'src/modules/ocorrencia/domain/entities/municao';
import { Droga } from 'src/modules/ocorrencia/domain/entities/droga';
import { Acusado } from 'src/modules/ocorrencia/domain/entities/acusado';
import { Vitima } from 'src/modules/ocorrencia/domain/entities/vitima';
import { Endereco } from 'src/modules/ocorrencia/domain/entities/Endereco';
import { Ocorrencia } from 'src/modules/ocorrencia/domain/entities/ocorrencia';
import { IOcorrenciaRepository } from 'src/modules/ocorrencia/infra/repository/interfaces/IOcorrenciaRepository';
import { OcorrenciaRequestDTO } from '../../dto/schema/CreateOcorrenciaSchema';
import { OcorrenciaResponseDTO } from '../../dto/response/OcorrenciaResponseDTO';
import { IOperacaoRepository } from 'src/modules/operacao/infra/repository/interfaces/IOperacaoRepository';

@Injectable()
export class CreateOcorrenciaUseCase {
  constructor(
    @Inject('IOcorrenciaRepository')
    private readonly ocorrenciaRepository: IOcorrenciaRepository,

    @Inject('IOperacaoRepository')
    private readonly operacaoRepository: IOperacaoRepository,
  ) {}

  async execute(
    operacaoId: string,
    dto: OcorrenciaRequestDTO,
  ): Promise<OcorrenciaResponseDTO> {
    const operacao = await this.operacaoRepository.findById(operacaoId);
    if (!operacao) {
      throw new Error('Operação não encontrada');
    }

    const ocorrenciaEntity = this.mapToEntity(dto);
    ocorrenciaEntity.operacao = operacao;

    const novaOcorrencia = await this.ocorrenciaRepository.create(
      ocorrenciaEntity,
    );

    return new OcorrenciaResponseDTO(novaOcorrencia);
  }

  private mapToEntity(dto: OcorrenciaRequestDTO): Ocorrencia {
    const ocorrencia = new Ocorrencia();
    ocorrencia.m = dto.m;
    ocorrencia.data = dto.data instanceof Date ? dto.data : new Date(dto.data);
    ocorrencia.horario = dto.horario;
    ocorrencia.tipo = dto.tipo;
    ocorrencia.resumo = dto.resumo;

    const endereco = new Endereco();
    endereco.rua = dto.endereco.rua;
    endereco.numero = dto.endereco.numero;
    endereco.bairro = dto.endereco.bairro;
    endereco.cidade = dto.endereco.cidade;
    endereco.uf = dto.endereco.uf;
    ocorrencia.endereco = endereco;

    ocorrencia.vitimas = (dto.vitimas || []).map((v) => {
      const vitima = new Vitima();
      vitima.nome = v.nome;
      vitima.cpf = v.cpf;
      vitima.idade = v.idade;
      vitima.dataNascimento = v.dataNascimento;
      vitima.nomeMae = v.nomeMae;
      vitima.nomePai = v.nomePai;
      vitima.naturalidade = v.naturalidade;
      vitima.nacionalidade = v.nacionalidade;

      const enderecoVitima = new Endereco();
      enderecoVitima.rua = v.endereco.rua;
      enderecoVitima.numero = v.endereco.numero;
      enderecoVitima.bairro = v.endereco.bairro;
      enderecoVitima.cidade = v.endereco.cidade;
      enderecoVitima.uf = v.endereco.uf;
      vitima.endereco = enderecoVitima;

      return vitima;
    });

    ocorrencia.acusados = (dto.acusados || []).map((a) => {
      const acusado = new Acusado();
      acusado.nome = a.nome;
      acusado.cpf = a.cpf;
      acusado.idade = a.idade;
      acusado.dataNascimento = a.dataNascimento;
      acusado.nomeMae = a.nomeMae;
      acusado.nomePai = a.nomePai;
      acusado.naturalidade = a.naturalidade;
      acusado.nacionalidade = a.nacionalidade;

      const enderecoAcusado = new Endereco();
      enderecoAcusado.rua = a.endereco.rua;
      enderecoAcusado.numero = a.endereco.numero;
      enderecoAcusado.bairro = a.endereco.bairro;
      enderecoAcusado.cidade = a.endereco.cidade;
      enderecoAcusado.uf = a.endereco.uf;
      acusado.endereco = enderecoAcusado;

      return acusado;
    });

    ocorrencia.drogas = (dto.drogas || []).map((d) => {
      const droga = new Droga();
      droga.tipo = d.tipo;
      droga.quantidade = d.quantidade;
      droga.unidadeMedida = d.unidadeMedida;
      return droga;
    });

    ocorrencia.municoes = (dto.municoes || []).map((m) => {
      const municao = new Municao();
      municao.calibre = m.calibre;
      municao.quantidade = m.quantidade;
      return municao;
    });

    ocorrencia.veiculos = (dto.veiculos || []).map((v) => {
      const veiculo = new Veiculo();
      veiculo.marca = v.marca;
      veiculo.tipo = v.tipo;
      veiculo.placa = v.placa;
      veiculo.modelo = v.modelo;
      veiculo.cor = v.cor;
      veiculo.situacao = v.situacao;
      return veiculo;
    });

    ocorrencia.armas = (dto.armas || []).map((a) => {
      const arma = new Arma();
      arma.tipo = a.tipo;
      arma.calibre = a.calibre;
      arma.numeracao = a.numeracao;
      arma.capacidade = a.capacidade;
      return arma;
    });

    ocorrencia.outrosObjetos = (dto.outrosObjetos || []).map((o) => {
      const outro = new OutroObjeto();
      outro.descricao = o.descricao;
      return outro;
    });

    ocorrencia.valoresApreendidos = (dto.valoresApreendidos || []).map((d) => {
      const dinheiro = new Dinheiro();
      dinheiro.valor = d.valor;
      return dinheiro;
    });

    return ocorrencia;
  }
}
