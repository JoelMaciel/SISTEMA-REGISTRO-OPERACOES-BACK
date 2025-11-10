import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Dinheiro } from 'src/modules/ocorrencia/domain/entities/dinheiro';
import { OutroObjeto } from 'src/modules/ocorrencia/domain/entities/outroObjeto';
import { Arma } from 'src/modules/ocorrencia/domain/entities/arma';
import { Veiculo } from 'src/modules/ocorrencia/domain/entities/veiculo';
import { Municao } from 'src/modules/ocorrencia/domain/entities/municao';
import { Droga } from 'src/modules/ocorrencia/domain/entities/droga';
import { Acusado } from 'src/modules/ocorrencia/domain/entities/acusado';
import { Vitima } from 'src/modules/ocorrencia/domain/entities/vitima';
import { Endereco } from 'src/modules/ocorrencia/domain/entities/Endereco';
import { Ocorrencia } from 'src/modules/ocorrencia/domain/entities/ocorrencia';
import { IOcorrenciaRepository } from 'src/modules/ocorrencia/infra/repository/interfaces/IOcorrenciaRepository';
import { OcorrenciaResponseDTO } from '../../dto/response/OcorrenciaResponseDTO';
import { UpdateOcorrenciaRequestDTO } from '../../dto/schema/UpdateOcorrenciaSchema';

@Injectable()
export class UpdateOcorrenciaUseCase {
  constructor(
    @Inject('IOcorrenciaRepository')
    private readonly ocorrenciaRepository: IOcorrenciaRepository,
  ) {}

  async execute(
    ocorrenciaId: string,
    dto: UpdateOcorrenciaRequestDTO,
  ): Promise<OcorrenciaResponseDTO> {
    const dadosParaAtualizar = dto as Partial<Ocorrencia>;

    const ocorrenciaAtualizada = await this.ocorrenciaRepository.update(
      ocorrenciaId,
      dadosParaAtualizar,
    );

    return new OcorrenciaResponseDTO(ocorrenciaAtualizada);
  }
}
