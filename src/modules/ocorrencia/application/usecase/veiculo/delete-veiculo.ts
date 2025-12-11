import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppError } from 'src/shared/errors/AppError';
import { IOcorrenciaRepository } from 'src/modules/ocorrencia/infra/repository/interfaces/IOcorrenciaRepository';
import { Veiculo } from 'src/modules/ocorrencia/domain/entities/veiculo';

@Injectable()
export class DeleteVeiculoFromOcorrenciaUseCase {
  constructor(
    @Inject('IOcorrenciaRepository')
    private readonly ocorrenciaRepository: IOcorrenciaRepository,

    private readonly dataSource: DataSource,
  ) {}

  async execute(ocorrenciaId: string, veiculoId: string): Promise<void> {
    const result = await this.ocorrenciaRepository.findOcorrenciaWithVeiculo(
      ocorrenciaId,
      veiculoId,
    );

    if (!result) {
      throw new AppError(
        'Ocorrência ou veículo não encontrada ou não vinculada',
        404,
      );
    }

    const { veiculo } = result;

    await this.dataSource.manager.remove(Veiculo, veiculo);

    return;
  }
}
