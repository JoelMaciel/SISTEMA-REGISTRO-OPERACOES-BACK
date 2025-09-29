import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperacaoController } from './modules/operacao/infra/controller/OperacaoController';
import { CriarOperacaoUseCase } from './modules/operacao/application/usecase/operacao/create-operacao';
import { OperacaoRepository } from './modules/operacao/infra/repository/OperacaoRepository';
import { Operacao } from './modules/operacao/domain/entities/operacao';
import { UpdateOperacaoUseCase } from './modules/operacao/application/usecase/operacao/update-operacao';
import { ListOperacaoUseCase } from './modules/operacao/application/usecase/operacao/list-operacao';
import { ShowOperacaoUseCase } from './modules/operacao/application/usecase/operacao/show-operacao';
import { UpdatePostoAreaOperacaoUseCase } from './modules/operacao/application/usecase/posto-servico/update-posto-area';
import { DeleteOperacaoUseCase } from './modules/operacao/application/usecase/operacao/delete-operacao';

@Module({
  imports: [TypeOrmModule.forFeature([Operacao])],
  controllers: [OperacaoController],
  providers: [
    CriarOperacaoUseCase,
    ListOperacaoUseCase,
    UpdateOperacaoUseCase,
    ShowOperacaoUseCase,
    UpdatePostoAreaOperacaoUseCase,
    DeleteOperacaoUseCase,
    {
      provide: 'IOperacaoRepository',
      useClass: OperacaoRepository,
    },
  ],
})
export class OperacaoModule {}
