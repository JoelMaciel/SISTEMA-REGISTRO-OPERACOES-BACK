import { Inject, Injectable } from '@nestjs/common';
import { IEquipeRepository } from '../../infra/repository/interfaces/IEquipeRepository';
import { EquipeOperacao } from '../../domain/entities/equipe-operacao';

@Injectable()
export class ListarEquipeUseCase {
  constructor(
    @Inject('IEquipeRepository')
    private readonly equipeRepository: IEquipeRepository,
  ) {}

  async execute(
    page = 1,
    size = 10,
    filtros?: Partial<{
      email: string;
      dataOperacao: string;
      nomeOperacao: string;
      opmGuarnicao: string;
      prefixoVtr: string;
      areaAtuacao: string;
      tipoServico: string;
    }>,
  ): Promise<{
    data: EquipeOperacao[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const [equipes, total] =
      await this.equipeRepository.findAllPaginatedAndFiltered(
        page,
        size,
        filtros,
      );
    const totalPages = Math.ceil(total / size);

    return { data: equipes, total, page, totalPages };
  }
}
