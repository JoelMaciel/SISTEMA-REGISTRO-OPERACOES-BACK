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
    dto: PostoAreaRequestDTO,
  ): Promise<PostoAreaResponseDTO> {
    const operacao = await this.operacaoRepository.findById(operacaoId, [
      'postoAreas',
    ]);

    if (!operacao) {
      throw new AppError('Operação nao encontrada na base de dados', 404);
    }

    const novoPostoArea = new PostoArea();
    novoPostoArea.nome = dto.nome;
    novoPostoArea.local = dto.local;
    novoPostoArea.numero = dto.numero ?? null;
    novoPostoArea.bairro = dto.bairro ?? null;
    novoPostoArea.cidade = dto.cidade;
    novoPostoArea.quantidade = dto.quantidade;
    novoPostoArea.operacao = operacao;

    operacao.postoAreas.push(novoPostoArea);

    const operacaoAtualizada = await this.operacaoRepository.save(operacao);

    const postoSalvo = operacaoAtualizada.postoAreas.find(
      (p) => p.id === novoPostoArea.id,
    );

    if (!postoSalvo) {
      throw new AppError('Falha ao criar o posto/área', 500);
    }

    return new PostoAreaResponseDTO(postoSalvo);
  }
}
