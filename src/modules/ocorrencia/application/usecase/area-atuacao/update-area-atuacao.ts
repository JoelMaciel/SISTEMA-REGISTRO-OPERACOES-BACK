// import { Inject, Injectable } from '@nestjs/common';
// import { IOperacaoRepository } from 'src/modules/operacao/infra/repository/interfaces/IOperacaoRepository';
// import { OperacaoResponseDTO } from '../../dto/response/OperacaoResponseDTO';
// import { AppError } from 'src/shared/errors/AppError';
// // import { AreaAtuacaoRequestDTO } from '../../dto/schema/AreaAtuacaoSchema';

// @Injectable()
// export class UpdateAreaAtuacaoOperacaoUseCase {
//   constructor(
//     @Inject('IOperacaoRepository')
//     private readonly operacaoRepository: IOperacaoRepository,
//   ) {}

//   async execute(
//     operacaoId: string,
//     areaAtuacaoId: string,
//     dto: AreaAtuacaoRequestDTO,
//   ): Promise<OperacaoResponseDTO> {
//     console.log('id area de atuacao use case', areaAtuacaoId);

//     const operacao = await this.operacaoRepository.findOperacaoWithAreaAtuacao(
//       operacaoId,
//       areaAtuacaoId,
//     );

//     if (!operacao) {
//       throw new AppError(
//         `Area de Atucação ${areaAtuacaoId} não está vinculado à operação ${operacaoId}`,
//       );
//     }

//     const areaAtuacao = operacao.areaAtuacao[0];

//     Object.assign(areaAtuacao, dto);

//     const areaAtuacaoAtualizada = await this.operacaoRepository.create(
//       operacao,
//     );

//     return new OperacaoResponseDTO(areaAtuacaoAtualizada);
//   }
// }
