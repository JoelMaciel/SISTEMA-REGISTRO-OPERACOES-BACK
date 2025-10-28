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

    if (Array.isArray(dto)) {
      const novosPostos = dto.map((item) => {
        const novo = new PostoArea();
        novo.nome = item.nome;
        novo.local = item.local;
        novo.numero = item.numero ?? null;
        novo.bairro = item.bairro ?? null;
        novo.cidade = item.cidade;
        novo.quantidade = item.quantidade;
        novo.operacao = operacao;
        return novo;
      });

      operacao.postoAreas.push(...novosPostos);
      const operacaoAtualizada = await this.operacaoRepository.save(operacao);

      const salvos = operacaoAtualizada.postoAreas.slice(-novosPostos.length);
      return salvos.map((p) => new PostoAreaResponseDTO(p));
    }

    const novoPosto = new PostoArea();
    novoPosto.nome = dto.nome;
    novoPosto.local = dto.local;
    novoPosto.numero = dto.numero ?? null;
    novoPosto.bairro = dto.bairro ?? null;
    novoPosto.cidade = dto.cidade;
    novoPosto.quantidade = dto.quantidade;
    novoPosto.operacao = operacao;

    operacao.postoAreas.push(novoPosto);
    const operacaoAtualizada = await this.operacaoRepository.save(operacao);

    const salvo = operacaoAtualizada.postoAreas.find(
      (p) => p.nome === novoPosto.nome && p.local === novoPosto.local,
    );

    if (!salvo) {
      throw new AppError('Falha ao criar o posto/área', 500);
    }

    return new PostoAreaResponseDTO(salvo);
  }
}
