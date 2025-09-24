import { PostoArea } from 'src/modules/operacao/domain/entities/posto-area';
import { OperacaoResponseDTO } from '../../dto/response/OperacaoResponseDTO';
import { Inject, Injectable } from '@nestjs/common';
import { IOperacaoRepository } from 'src/modules/operacao/infra/repository/interfaces/IOperacaoRepository';
import { CreateOperacaoRequestDTO } from '../../dto/schema/CreateOperacaoSchema';
import { Operacao } from 'src/modules/operacao/domain/entities/operacao';

@Injectable()
export class CriarOperacaoUseCase {
  constructor(
    @Inject('IOperacaoRepository')
    private readonly operacaoRepository: IOperacaoRepository,
  ) {}

  async execute(dto: CreateOperacaoRequestDTO): Promise<OperacaoResponseDTO> {
    const parseDate = (dateString: string): Date => {
      const [day, month, year] = dateString.split('-').map(Number);
      return new Date(year, month - 1, day);
    };

    const operacao = new Operacao();
    operacao.nome = dto.nome;
    operacao.opmDemandante = dto.opmDemandante;
    operacao.dataInicial = parseDate(dto.dataInicial);
    operacao.dataFinal = parseDate(dto.dataFinal);
    operacao.efetivoPolicial = dto.efetivoPolicial;
    operacao.quantidadePostoArea = dto.quantidadePostoArea;
    operacao.observacoes = dto.observacoes;

    operacao.postoAreas = (dto.postoAreas || []).map((posto) => {
      const novoPosto = new PostoArea();
      novoPosto.nome = posto.nome;
      novoPosto.local = posto.local;
      novoPosto.numero = posto.numero;
      novoPosto.bairro = posto.bairro;
      novoPosto.cidade = posto.cidade;
      novoPosto.quantidade = posto.quantidade;
      return novoPosto;
    });

    const novaOperacao = await this.operacaoRepository.create(operacao);

    return {
      id: novaOperacao.id,
      nome: novaOperacao.nome,
      opmDemandante: novaOperacao.opmDemandante,
      dataInicial: novaOperacao.dataInicial,
      dataFinal: novaOperacao.dataFinal,
      efetivoPolicial: novaOperacao.efetivoPolicial,
      quantidadePostoArea: novaOperacao.quantidadePostoArea,
      observacoes: novaOperacao.observacoes,
      postoAreas: novaOperacao.postoAreas?.map((posto) => ({
        id: posto.id,
        nome: posto.nome,
        local: posto.local,
        cidade: posto.cidade,
        quantidade: posto.quantidade,
      })),
    };
  }
}

// @Injectable()
// export class CriarOperacaoUseCase {
//   constructor(
//     @Inject('IOperacaoRepository')
//     private readonly operacaoRepository: IOperacaoRepository,
//   ) {}

//   async execute(dto: CreateOperacaoRequestDTO): Promise<OperacaoResponseDTO> {
//     const parseDate = (dateString: string): Date => {
//       const [day, month, year] = dateString.split('-').map(Number);
//       return new Date(year, month - 1, day);
//     };

//     const operacao = new Operacao();
//     operacao.nome = dto.nome;
//     operacao.opmDemandante = dto.opmDemandante;
//     operacao.dataInicial = parseDate(dto.dataInicial);
//     operacao.dataFinal = parseDate(dto.dataFinal);
//     operacao.efetivoPolicial = dto.efetivoPolicial;
//     operacao.quantidadePostoArea = dto.quantidadePostoArea;
//     operacao.observacoes = dto.observacoes;

//     operacao.postoAreas = (dto.postoAreas || []).map((posto) => {
//       const novoPosto = new PostoArea();
//       novoPosto.nome = posto.nome;
//       novoPosto.local = posto.local;
//       novoPosto.numero = posto.numero;
//       novoPosto.bairro = posto.bairro;
//       novoPosto.cidade = posto.cidade;
//       novoPosto.quantidade = posto.quantidade;
//       novoPosto.operacao = operacao;
//       return novoPosto;
//     });
//     const novaOperacao = await this.operacaoRepository.create(operacao);

//     return new OperacaoResponseDTO(novaOperacao);
//   }
// }
