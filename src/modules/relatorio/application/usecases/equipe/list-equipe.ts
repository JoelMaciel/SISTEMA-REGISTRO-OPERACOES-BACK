import { Inject, Injectable } from '@nestjs/common';
import {
  IEquipeRepository,
  IPaginatedResult,
} from '../../../infra/repository/interfaces/IEquipeRepository';
import { EquipeResponseDTO } from '../../dto/response/EquipeResponseDTO';

@Injectable()
export class ListarEquipeUseCase {
  constructor(
    @Inject('IEquipeRepository')
    private readonly equipeRepository: IEquipeRepository,
  ) {}

  async execute(
    page = 1,
    limit = 10,
    matriculaComandante?: string,
    dataOperacao?: string,
    nomeOperacao?: string,
    opmGuarnicao?: string,
    prefixoVtr?: string,
    logradouro?: string,
  ): Promise<IPaginatedResult<EquipeResponseDTO>> {
    const result = await this.equipeRepository.findAll(
      page,
      limit,
      matriculaComandante,
      dataOperacao,
      nomeOperacao,
      opmGuarnicao,
      prefixoVtr,
      logradouro,
    );

    const items = result.items.map((equipe) => new EquipeResponseDTO(equipe));

    return {
      items,
      total: result.total,
      pageIndex: result.pageIndex,
      pageSize: result.pageSize,
    };
  }
}
