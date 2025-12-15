import { Inject, Injectable } from '@nestjs/common';

import { AppError } from 'src/shared/errors/AppError';
import { Fiscal } from 'src/modules/fiscal/domain/entities/fiscal';
import { PostoComandante } from 'src/modules/equipe/domain/enums/posto-comandante.enum';
import { IFiscalRepository } from '../../infra/repository/interfaces/IFiscalRepository';
import { CreateFiscalRequestDTO } from '../dto/shemas/CreateFiscalSchema';
import { FiscalResponseDTO } from '../dto/response/FiscalResponseDTO';

@Injectable()
export class CreateFiscalUseCase {
  constructor(
    @Inject('IFiscalRepository')
    private readonly fiscalRepository: IFiscalRepository,
  ) {}

  async execute(dto: CreateFiscalRequestDTO): Promise<FiscalResponseDTO> {
    const fiscalExistente = await this.fiscalRepository.findByMatricula(
      dto.matricula,
    );

    if (fiscalExistente) {
      throw new AppError(
        `Já existe um Fiscal cadastrado com a matrícula: ${dto.matricula}.`,
        409,
      );
    }

    const data: Partial<Fiscal> = {
      postoGraduação: dto.postoGraduacao as PostoComandante,
      nome: dto.nome,
      matricula: dto.matricula,
      opm: dto.opm,
    };

    const novoFiscal = await this.fiscalRepository.create(data);

    return new FiscalResponseDTO(novoFiscal);
  }
}
