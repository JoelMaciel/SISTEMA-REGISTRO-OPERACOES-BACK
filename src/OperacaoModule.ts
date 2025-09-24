import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperacaoController } from './modules/operacao/infra/controller/OperacaoController';
import { CriarOperacaoUseCase } from './modules/operacao/application/usecase/operacao/create-operacao';
import { OperacaoRepository } from './modules/operacao/infra/repository/OperacaoRepository';
import { Operacao } from './modules/operacao/domain/entities/operacao';
// import { ListOperacaoUseCase } from './modules/operacao/application/usecase/operacao/list-operacao';
// import { UpdateOperacaoUseCase } from './modules/operacao/application/usecase/operacao/update-operacao';
// import { UpdatePostoServicoOperacaoUseCase } from './modules/operacao/application/usecase/posto-servico/update-posto-servico';
// import { UpdateAreaAtuacaoOperacaoUseCase } from './modules/operacao/application/usecase/area-atuacao/update-area-atuacao';
// import { FindByIdOperacaoUseCase } from './modules/operacao/application/usecase/operacao/show-operacao';

@Module({
  imports: [TypeOrmModule.forFeature([Operacao])],
  controllers: [OperacaoController],
  providers: [
    CriarOperacaoUseCase,
    // ListOperacaoUseCase,
    // UpdateOperacaoUseCase,
    // UpdatePostoServicoOperacaoUseCase,
    // UpdateAreaAtuacaoOperacaoUseCase,
    // FindByIdOperacaoUseCase,
    {
      provide: 'IOperacaoRepository',
      useClass: OperacaoRepository,
    },
  ],
})
export class OperacaoModule {}
