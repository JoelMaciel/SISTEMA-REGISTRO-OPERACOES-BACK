import { Inject, Injectable } from '@nestjs/common';
import { IEquipeRepository } from '../../../infra/repository/interfaces/IEquipeRepository';
import { EquipeOperacao } from '../../../domain/entities/equipe';
import { CreateEquipeRequestDTO } from '../../dto/shemas/CreateEquipeSchema';
import { EquipeResponseDTO } from '../../dto/response/EquipeResponseDTO';
import { LocalAtividade } from '../../../domain/enums/local-atividade.enum';
import { AreaAtuacao } from '../../../domain/enums/area-atuacao.enum';
import { TipoServico } from '../../../domain/enums/tipo-servico.enum';
import { PostoComandante } from '../../../domain/enums/posto-comandante.enum';

@Injectable()
export class CriarEquipeUseCase {
  constructor(
    @Inject('IEquipeRepository')
    private readonly equipeRepository: IEquipeRepository,
  ) {}

  async execute(dto: CreateEquipeRequestDTO): Promise<EquipeResponseDTO> {
    const data: Partial<EquipeOperacao> = {
      ...dto,
      atividadeRealizada: dto.atividadeRealizada,
      localAtividade: dto.localAtividade as LocalAtividade,
      areaAtuacao: dto.areaAtuacao as AreaAtuacao,
      tipoServico: dto.tipoServico as TipoServico,
      postoComandante: dto.postoComandante as PostoComandante,
    };

    const novaEquipe = await this.equipeRepository.create(data);
    return new EquipeResponseDTO(novaEquipe);
  }
}
