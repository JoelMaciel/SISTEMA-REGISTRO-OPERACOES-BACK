import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperacaoController } from './modules/equipe-operacao/infra/controller/OperacaoController';
import { CriarOperacaoUseCase } from './modules/operacao/application/usecase/operacao/create-operacao';
import { OperacaoRepository } from './modules/equipe-operacao/infra/repository/OperacaoRepository';
import { Operacao } from './modules/operacao/domain/entities/operacao';

@Module({
  imports: [TypeOrmModule.forFeature([Operacao])],
  controllers: [OperacaoController],
  providers: [
    CriarOperacaoUseCase,

    {
      provide: 'IOperacaoRepository',
      useClass: OperacaoRepository,
    },
  ],
})
export class OperacaoModule {}
