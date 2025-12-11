import { Inject, Injectable } from '@nestjs/common';
import { IEquipeRepository } from '../../../infra/repository/interfaces/IEquipeRepository';
import { CreateEquipeRequestDTO } from '../../dto/shemas/CreateEquipeSchema';
import { EquipeResponseDTO } from '../../dto/response/EquipeResponseDTO';
import { TipoServico } from '../../../domain/enums/tipo-servico.enum';
import { PostoComandante } from '../../../domain/enums/posto-comandante.enum';
import { Equipe } from 'src/modules/equipe/domain/entities/equipe';
import { IOperacaoRepository } from 'src/modules/operacao/infra/repository/interfaces/IOperacaoRepository';
import { AppError } from 'src/shared/errors/AppError';

@Injectable()
export class CriarEquipeUseCase {
  constructor(
    @Inject('IEquipeRepository')
    private readonly equipeRepository: IEquipeRepository,

    @Inject('IOperacaoRepository')
    private readonly operacaoRepository: IOperacaoRepository,
  ) {}

  async execute(
    operacaoId: string,
    dto: CreateEquipeRequestDTO,
  ): Promise<EquipeResponseDTO> {
    const vinculo = await this.operacaoRepository.findOperacaoWithPostoArea(
      operacaoId,
      dto.postoAreaId,
    );

    if (!vinculo) {
      throw new AppError(
        'Posto ou Área não está vinculado à operação especificada.',
        400,
      );
    }

    const { postoArea } = vinculo;

    const logradouro = this.obterLogradouro(postoArea);

    const data: Partial<Equipe> = {
      ...dto,
      tipoServico: dto.tipoServico as TipoServico,
      postoComandante: dto.postoComandante as PostoComandante,
      logradouro,
    };

    const novaEquipe = await this.equipeRepository.create(data);
    return new EquipeResponseDTO(novaEquipe);
  }

  private obterLogradouro(postoArea: any): string {
    const partes = [postoArea.nome, postoArea.local, postoArea.cidade].filter(
      Boolean,
    );
    return partes.length ? partes.join(' - ') : 'Endereço não disponível';
  }
}
