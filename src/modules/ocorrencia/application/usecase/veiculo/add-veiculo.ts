import { Inject, Injectable } from '@nestjs/common';
import { IOcorrenciaRepository } from 'src/modules/ocorrencia/infra/repository/interfaces/IOcorrenciaRepository';
import { VeiculoRequestDTO } from '../../dto/schema/CreateOcorrenciaSchema';
import { AppError } from 'src/shared/errors/AppError';
import { VeiculoResponseDTO } from '../../dto/response/VeiculoResponseDTO';
import { Veiculo } from 'src/modules/ocorrencia/domain/entities/veiculo';

@Injectable()
export class AddVeiculoToOcorrenciaUseCase {
  constructor(
    @Inject('IOcorrenciaRepository')
    private readonly ocorrenciaRepository: IOcorrenciaRepository,
  ) {}

  async execute(
    ocorrenciaId: string,
    dto: VeiculoRequestDTO,
  ): Promise<VeiculoResponseDTO> {
    const ocorrencia = await this.ocorrenciaRepository.findById(ocorrenciaId);

    if (!ocorrencia) {
      throw new AppError(`Ocorrência ${ocorrenciaId} não encontrada.`, 404);
    }

    const novoVeiculo = new Veiculo();
    novoVeiculo.tipo = dto.tipo;
    novoVeiculo.marca = dto.marca;
    novoVeiculo.placa = dto.placa;
    novoVeiculo.modelo = dto.modelo;
    novoVeiculo.cor = dto.cor;
    novoVeiculo.situacao = dto.situacao;

    novoVeiculo.ocorrencia = ocorrencia;

    const veiculoSalvo = await this.ocorrenciaRepository.saveVeiculo(
      novoVeiculo,
    );

    return new VeiculoResponseDTO(veiculoSalvo);
  }
}
