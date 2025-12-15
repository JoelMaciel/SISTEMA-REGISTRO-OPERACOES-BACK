import { Inject, Injectable } from '@nestjs/common';
import { IFiscalRepository } from 'src/modules/fiscal/infra/repository/interfaces/IFiscalRepository';
import { AppError } from 'src/shared/errors/AppError';
import { FiscalResponseDTO } from '../dto/response/FiscalResponseDTO';

@Injectable()
export class ShowFiscalUseCase {
  constructor(
    @Inject('IFiscalRepository')
    private readonly fiscalRepository: IFiscalRepository,
  ) {}

  async execute(id: string): Promise<FiscalResponseDTO> {
    const fiscal = await this.fiscalRepository.findById(id);
    if (!fiscal) {
      throw new AppError('Fiscal não encontrado na base de dados', 404);
    }
    return new FiscalResponseDTO(fiscal);
  }
}
