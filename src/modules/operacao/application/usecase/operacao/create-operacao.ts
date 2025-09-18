import { Inject, Injectable } from '@nestjs/common';
import { Operacao } from 'src/modules/operacao/domain/entities/operacao';
import { IOperacaoRepository } from 'src/modules/operacao/infra/repository/interfaces/IOperacaoRepository';
import { OperacaoResponseDTO } from '../../dto/response/OperacaoResponseDTO';
import { PostoServico } from 'src/modules/operacao/domain/entities/posto-area';
import { AreaAtuacao } from 'src/modules/operacao/domain/entities/area-atuacao';
import { CreateOperacaoRequestDTO } from '../../dto/schema/CreateOperacaoSchema';

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

    const postosServico: PostoServico[] = (dto.postoServico || []).map(
      (posto) => {
        const novoPosto = new PostoServico();
        novoPosto.nome = posto.nome;
        novoPosto.local = posto.local;
        novoPosto.quantidade = posto.quantidade;
        return novoPosto;
      },
    );

    const areasAtuacao: AreaAtuacao[] = (dto.areaAtuacao || []).map((area) => {
      const novaArea = new AreaAtuacao();
      novaArea.nome = area.nome;
      novaArea.local = area.local;
      novaArea.quantidade = area.quantidade;
      return novaArea;
    });

    const data: Partial<Operacao> = {
      nome: dto.nome,
      opmDemandante: dto.opmDemandante,
      dataInicial: parseDate(dto.dataInicial),
      dataFinal: parseDate(dto.dataFinal),
      efetivoPolicial: dto.efetivoPolicial,
      quantidadePostoArea: dto.quantidadePostoArea,
      observacoes: dto.observacoes,
      postoServico: postosServico,
      areaAtuacao: areasAtuacao,
    };

    const novaOperacao = await this.operacaoRepository.create(data);
    return new OperacaoResponseDTO(novaOperacao);
  }
}
