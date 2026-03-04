import { Inject, Injectable } from '@nestjs/common';
import { IOperacaoRepository } from 'src/modules/operacao/infra/repository/interfaces/IOperacaoRepository';
import { PostoAreaRequestDTO } from '../../dto/schema/PostoAreaSchema';
import { PostoAreaResponseDTO } from '../../dto/response/PostoAreaResponseDTO';
import { AppError } from 'src/shared/errors/AppError';
import { PostoArea } from 'src/modules/operacao/domain/entities/posto-area';

@Injectable()
export class AddPostoAreaOperacaoUseCase {
  constructor(
    @Inject('IOperacaoRepository')
    private readonly operacaoRepository: IOperacaoRepository,
  ) {}

  async execute(
    operacaoId: string,
    dto: PostoAreaRequestDTO | PostoAreaRequestDTO[],
  ): Promise<PostoAreaResponseDTO[] | PostoAreaResponseDTO> {
    const operacao = await this.operacaoRepository.findById(operacaoId, [
      'postoAreas',
    ]);

    if (!operacao) {
      throw new AppError('Operação não encontrada na base de dados', 404);
    }

    const dtos = Array.isArray(dto) ? dto : [dto];

    const novosPostos = dtos.map((item) => {
      const novo = new PostoArea();

      Object.assign(novo, item);

      novo.numero = item.numero ?? null;
      novo.bairro = item.bairro ?? null;
      novo.operacao = operacao;
      return novo;
    });

    operacao.postoAreas.push(...novosPostos);
    const operacaoAtualizada = await this.operacaoRepository.save(operacao);

    if (Array.isArray(dto)) {
      const salvos = operacaoAtualizada.postoAreas.slice(-novosPostos.length);
      return salvos.map((p) => new PostoAreaResponseDTO(p));
    }

    const salvo =
      operacaoAtualizada.postoAreas[operacaoAtualizada.postoAreas.length - 1];

    return new PostoAreaResponseDTO(salvo);
  }
}
