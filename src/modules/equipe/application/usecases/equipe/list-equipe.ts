import { Inject, Injectable } from '@nestjs/common';
import {
  IEquipeRepository,
  IPaginatedResult,
} from '../../../infra/repository/interfaces/IEquipeRepository';
import { EquipeOperacao } from '../../../domain/entities/equipe';

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
    areaAtuacao?: string,
    tipoServico?: string,
    localAtividade?: string,
    atividadeRealizada?: string,
  ): Promise<IPaginatedResult<EquipeOperacao>> {
    return this.equipeRepository.findAll(
      page,
      limit,
      matriculaComandante,
      dataOperacao,
      nomeOperacao,
      opmGuarnicao,
      prefixoVtr,
      areaAtuacao,
      tipoServico,
      localAtividade,
      atividadeRealizada,
    );
  }
}
