import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperacaoController } from './modules/operacao/infra/controller/OperacaoController';
import { CriarOperacaoUseCase } from './modules/operacao/application/usecase/operacao/create-operacao';
import { OperacaoRepository } from './modules/operacao/infra/repository/OperacaoRepository';
import { Operacao } from './modules/operacao/domain/entities/operacao';
import { ListOperacaoUseCase } from './modules/operacao/application/usecase/operacao/list-operacao';

@Module({
  imports: [TypeOrmModule.forFeature([Operacao])],
  controllers: [OperacaoController],
  providers: [
    CriarOperacaoUseCase,
    ListOperacaoUseCase,

    {
      provide: 'IOperacaoRepository',
      useClass: OperacaoRepository,
    },
  ],
})
export class OperacaoModule {}
