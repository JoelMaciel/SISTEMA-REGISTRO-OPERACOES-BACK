import { Inject, Injectable } from '@nestjs/common';
import { AppError } from 'src/shared/errors/AppError';
import { Fiscal } from 'src/modules/fiscal/domain/entities/fiscal';
import { IFiscalRepository } from '../../infra/repository/interfaces/IFiscalRepository';
import { FiscalResponseDTO } from '../dto/response/FiscalResponseDTO';
import { CreateFiscalRequestDTO } from '../dto/shemas/CreateFiscalSchema';

@Injectable()
export class UpdateFiscalUseCase {
  constructor(
    @Inject('IFiscalRepository')
    private readonly fiscalRepository: IFiscalRepository,
  ) {}

  async execute(
    id: string,
    dto: Partial<CreateFiscalRequestDTO>,
  ): Promise<FiscalResponseDTO> {
    const fiscalExistente = await this.fiscalRepository.findById(id);

    if (!fiscalExistente) {
      throw new AppError('Fiscal não encontrado.', 404);
    }

    if (dto.matricula) {
      const fiscalComNovaMatricula =
        await this.fiscalRepository.findByMatricula(dto.matricula);
      if (fiscalComNovaMatricula && fiscalComNovaMatricula.id !== id) {
        throw new AppError('Matrícula já cadastrada para outro Fiscal.', 409);
      }
    }

    const dataUpdate: Partial<Fiscal> = {
      postoGraduação: dto.postoGraduacao,
      nome: dto.nome,
      matricula: dto.matricula,
      opm: dto.opm,
    };

    const fiscalAtualizado = await this.fiscalRepository.update(id, dataUpdate);

    return new FiscalResponseDTO(fiscalAtualizado);
  }
}
