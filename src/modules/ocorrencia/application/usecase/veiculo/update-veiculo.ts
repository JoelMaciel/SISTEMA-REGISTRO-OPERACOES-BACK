import { Inject, Injectable } from '@nestjs/common';
import { AppError } from 'src/shared/errors/AppError';
import { IOcorrenciaRepository } from 'src/modules/ocorrencia/infra/repository/interfaces/IOcorrenciaRepository';
import { VeiculoRequestDTO } from '../../dto/schema/CreateOcorrenciaSchema';
import { VeiculoResponseDTO } from '../../dto/response/VeiculoResponseDTO';

@Injectable()
export class UpdateVeiculoUseCase {
  constructor(
    @Inject('IOcorrenciaRepository')
    private readonly ocorrenciaRepository: IOcorrenciaRepository,
  ) {}

  async execute(
    ocorrenciaId: string,
    veiculoId: string,
    data: VeiculoRequestDTO,
  ): Promise<VeiculoResponseDTO> {
    const result = await this.ocorrenciaRepository.findOcorrenciaWithVeiculo(
      ocorrenciaId,
      veiculoId,
    );

    if (!result) {
      throw new AppError(
        `Veículo ${veiculoId} não pertence à ocorrência ${ocorrenciaId}`,
      );
    }

    const { veiculo } = result;

    if (data.tipo !== undefined) veiculo.tipo = data.tipo;
    if (data.marca !== undefined) veiculo.marca = data.marca;
    if (data.placa !== undefined) veiculo.placa = data.placa;
    if (data.modelo !== undefined) veiculo.modelo = data.modelo;
    if (data.cor !== undefined) veiculo.cor = data.cor;
    if (data.situacao !== undefined) veiculo.situacao = data.situacao;

    await this.ocorrenciaRepository.saveVeiculo(veiculo);

    return new VeiculoResponseDTO(veiculo);
  }
}
