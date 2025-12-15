// src/modules/relatorio/application/use-cases/CreateFiscalUseCase.ts

import { Inject, Injectable } from '@nestjs/common';
import { IFiscalRepository } from '../../../infra/repository/interfaces/IFiscalRepository';
import { FiscalResponseDTO } from '../../dto/response/FiscalResponseDTO';
import { AppError } from 'src/shared/errors/AppError'; // Usando o AppError do seu exemplo
import { Fiscal } from 'src/modules/fiscal/domain/entities/fiscal';
import { CreateFiscalRequestDTO } from '../../dto/shemas/CreateFiscalSchema';
import { PostoComandante } from 'src/modules/equipe/domain/enums/posto-comandante.enum';

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
        409, // Conflict
      );
    }

    // 2. Criação da entidade
    const data: Partial<Fiscal> = {
      postoGraduação: dto.postoGraduacao as PostoComandante,
      nome: dto.nome,
      matricula: dto.matricula,
      opm: dto.opm,
    };

    // 3. Persistência
    const novoFiscal = await this.fiscalRepository.create(data);

    // 4. Retorno
    return new FiscalResponseDTO(novoFiscal);
  }
}
