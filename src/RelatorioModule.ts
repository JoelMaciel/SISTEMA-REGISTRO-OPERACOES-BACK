import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelatorioRepository } from './modules/relatorio/infra/repository/RelatorioRepository';
import { Relatorio } from './modules/relatorio/domain/entities/relatorio';
import { RelatorioController } from './modules/relatorio/infra/controller/RelatorioController';
import { CreateRelatorioUseCase } from './modules/relatorio/application/usecases/create-relatorio';
import { FiscalRepository } from './modules/fiscal/infra/repository/FiscalRepository';
import { OperacaoRepository } from './modules/operacao/infra/repository/OperacaoRepository';
import { AspectoPositivo } from './modules/relatorio/domain/entities/aspectosPositivos';
import { MelhoriaIdentificada } from './modules/relatorio/domain/entities/melhoriaIndentificada';
import { AlteracaoEfetivo } from './modules/relatorio/domain/entities/alteracaoEfetivo';
import { OutraAlteracao } from './modules/relatorio/domain/entities/outraAlteracao';
import { Fiscal } from './modules/fiscal/domain/entities/fiscal';
import { Operacao } from './modules/operacao/domain/entities/operacao';
import { Equipe } from './modules/equipe/domain/entities/equipe';
import { EquipeRepository } from './modules/equipe/infra/repository/EquipeRepository';
import { Ocorrencia } from './modules/ocorrencia/domain/entities/ocorrencia';
import { OcorrenciaRepository } from './modules/ocorrencia/infra/repository/OcorrenciaRepository';
import { Arma } from './modules/ocorrencia/domain/entities/arma';
import { Droga } from './modules/ocorrencia/domain/entities/droga';
import { Veiculo } from './modules/ocorrencia/domain/entities/veiculo';
import { Municao } from './modules/ocorrencia/domain/entities/municao';
import { Dinheiro } from './modules/ocorrencia/domain/entities/dinheiro';
import { Vitima } from './modules/ocorrencia/domain/entities/vitima';
import { Acusado } from './modules/ocorrencia/domain/entities/acusado';
import { Endereco } from './modules/ocorrencia/domain/entities/Endereco';
import { OutroObjeto } from './modules/ocorrencia/domain/entities/outroObjeto';
import { ListarRelatoriosUseCase } from './modules/relatorio/application/usecases/list-relatorio';
import { ShowRelatoriodUseCase } from './modules/relatorio/application/usecases/show-relatorio';
import { DeleteRelatorioUseCase } from './modules/relatorio/application/usecases/delete-relatorio';
import { GerarPdfRelatorioUseCase } from './modules/relatorio/application/usecases/relatorio-pdf';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Relatorio,
      AspectoPositivo,
      MelhoriaIdentificada,
      AlteracaoEfetivo,
      OutraAlteracao,
      Fiscal,
      Equipe,
      Operacao,
      Ocorrencia,
      Arma,
      Droga,
      Veiculo,
      Municao,
      Dinheiro,
      Vitima,
      Acusado,
      Endereco,
      OutroObjeto,
    ]),
  ],
  controllers: [RelatorioController],
  providers: [
    CreateRelatorioUseCase,
    ListarRelatoriosUseCase,
    ShowRelatoriodUseCase,
    DeleteRelatorioUseCase,
    GerarPdfRelatorioUseCase,
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
    {
      provide: 'IEquipeRepository',
      useClass: EquipeRepository,
    },
    {
      provide: 'IOcorrenciaRepository',
      useClass: OcorrenciaRepository,
    },
  ],
  exports: ['IRelatorioRepository', 'IFiscalRepository', 'IOperacaoRepository'],
})
export class RelatorioModule {}
