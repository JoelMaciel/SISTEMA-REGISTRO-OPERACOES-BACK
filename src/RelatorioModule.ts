import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelatorioRepository } from './modules/relatorio/infra/repository/RelatorioRepository';
import { Relatorio } from './modules/relatorio/domain/entities/relatorio';
import { RelatorioController } from './modules/relatorio/infra/controller/RelatorioController';
import { CreateRelatorioUseCase } from './modules/relatorio/application/usecases/equipe/create-relatorio';
import { FiscalRepository } from './modules/fiscal/infra/repository/FiscalRepository';
import { OperacaoRepository } from './modules/operacao/infra/repository/OperacaoRepository';
import { AspectoPositivo } from './modules/relatorio/domain/entities/aspectosPositivos';
import { MelhoriaIdentificada } from './modules/relatorio/domain/entities/melhoriaIndentificada';
import { AlteracaoEfetivo } from './modules/relatorio/domain/entities/alteracaoEfetivo';
import { OutraAlteracao } from './modules/relatorio/domain/entities/outraAlteracao';
import { Fiscal } from './modules/fiscal/domain/entities/fiscal';
import { Operacao } from './modules/operacao/domain/entities/operacao';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Relatorio,
      AspectoPositivo,
      MelhoriaIdentificada,
      AlteracaoEfetivo,
      OutraAlteracao,
      Fiscal,
      Operacao,
    ]),
  ],
  controllers: [RelatorioController],
  providers: [
    CreateRelatorioUseCase,
    {
      provide: 'IRelatorioRepository',
      useClass: RelatorioRepository,
    },
    {
      provide: 'IFiscalRepository',
      useClass: FiscalRepository,
    },
    {
      provide: 'IOperacaoRepository',
      useClass: OperacaoRepository,
    },
  ],
  exports: ['IRelatorioRepository', 'IFiscalRepository', 'IOperacaoRepository'],
})
export class RelatorioModule {}
