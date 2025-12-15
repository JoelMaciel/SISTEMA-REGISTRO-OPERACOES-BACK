import { Inject, Injectable } from '@nestjs/common';
import { AppError } from 'src/shared/errors/AppError';
import { IFiscalRepository } from '../../infra/repository/interfaces/IFiscalRepository';

@Injectable()
export class DeleteFiscalUseCase {
  constructor(
    @Inject('IFiscalRepository')
    private readonly fiscalRepository: IFiscalRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const fiscal = await this.fiscalRepository.findById(id);

    if (!fiscal) {
      throw new AppError('Fiscal não encontrado.', 404);
    }

    await this.fiscalRepository.delete(id);
  }
}
