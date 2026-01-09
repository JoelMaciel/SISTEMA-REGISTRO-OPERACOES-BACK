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
import { UpdateDadosGeraisRelatorioUseCase } from './modules/relatorio/application/usecases/UpdateDadosGeraisRelatorioUseCase.ts';
import { DeleteAlteracaoEfetivoUseCase } from './modules/relatorio/application/usecases/alteraca-efetivo/delete-alteracao-efetico';
import { UpdateAlteracaoEfetivoUseCase } from './modules/relatorio/application/usecases/alteraca-efetivo/update-alteracao-efetivo';
import { CreateAlteracaoEfetivoUseCase } from './modules/relatorio/application/usecases/alteraca-efetivo/create-alteracao-efetivo';
import { CreateAspectoPositivoUseCase } from './modules/relatorio/application/usecases/aspecto-positivo/create-aspecto';
import { UpdateAspectoPositivoUseCase } from './modules/relatorio/application/usecases/aspecto-positivo/update-aspecto';
import { DeleteAspectoPositivoUseCase } from './modules/relatorio/application/usecases/aspecto-positivo/delete-aspecto';
import { CreateMelhoriaIdentificadaUseCase } from './modules/relatorio/application/usecases/melhoria-identificada/create-melhoria';
import { UpdateMelhoriaIdentificadaUseCase } from './modules/relatorio/application/usecases/melhoria-identificada/update-melhoria';
import { DeleteMelhoriaIdentificadaUseCase } from './modules/relatorio/application/usecases/melhoria-identificada/delete-melhoria';
import { CreateOutraAlteracaoUseCase } from './modules/relatorio/application/usecases/outras-alteracoes/create-outra-alteracao';
import { UpdateOutraAlteracaoUseCase } from './modules/relatorio/application/usecases/outras-alteracoes/update-outra-alteracao';
import { DeleteOutraAlteracaoUseCase } from './modules/relatorio/application/usecases/outras-alteracoes/delete-outra-alteracao';

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
    UpdateDadosGeraisRelatorioUseCase,
    DeleteAlteracaoEfetivoUseCase,
    UpdateAlteracaoEfetivoUseCase,
    CreateAlteracaoEfetivoUseCase,
    CreateAspectoPositivoUseCase,
    UpdateAspectoPositivoUseCase,
    DeleteAspectoPositivoUseCase,
    CreateMelhoriaIdentificadaUseCase,
    UpdateMelhoriaIdentificadaUseCase,
    DeleteMelhoriaIdentificadaUseCase,
    CreateOutraAlteracaoUseCase,
    UpdateOutraAlteracaoUseCase,
    DeleteOutraAlteracaoUseCase,
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
