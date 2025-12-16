import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { OperacaoModule } from './OperacaoModule';
import { Operacao } from './modules/operacao/domain/entities/operacao';
import { PostoArea } from './modules/operacao/domain/entities/posto-area';
import { EquipeModule } from './EquipeModule';
import { Equipe } from './modules/equipe/domain/entities/equipe';
import { OcorrenciaModule } from './OcorrenciaModule';
import { Ocorrencia } from './modules/ocorrencia/domain/entities/ocorrencia';
import { Vitima } from './modules/ocorrencia/domain/entities/vitima';
import { Acusado } from './modules/ocorrencia/domain/entities/acusado';
import { Droga } from './modules/ocorrencia/domain/entities/droga';
import { Endereco } from './modules/ocorrencia/domain/entities/Endereco';
import { OutroObjeto } from './modules/ocorrencia/domain/entities/outroObjeto';
import { Municao } from './modules/ocorrencia/domain/entities/municao';
import { Dinheiro } from './modules/ocorrencia/domain/entities/dinheiro';
import { Arma } from './modules/ocorrencia/domain/entities/arma';
import { Veiculo } from './modules/ocorrencia/domain/entities/veiculo';
import { Relatorio } from './modules/relatorio/domain/entities/relatorio';
import { Fiscal } from './modules/fiscal/domain/entities/fiscal';
import { AspectoPositivo } from './modules/relatorio/domain/entities/aspectosPositivos';
import { MelhoriaIdentificada } from './modules/relatorio/domain/entities/melhoriaIndentificada';
import { AlteracaoEfetivo } from './modules/relatorio/domain/entities/alteracaoEfetivo';
import { OutraAlteracao } from './modules/relatorio/domain/entities/outraAlteracao';
import { FiscalModule } from './FiscalModule';
import { RelatorioModule } from './RelatorioModule';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),
        entities: [
          Operacao,
          PostoArea,
          Equipe,
          Ocorrencia,
          Vitima,
          Acusado,
          Droga,
          Endereco,
          OutroObjeto,
          Municao,
          Dinheiro,
          Arma,
          Veiculo,
          Relatorio,
          Fiscal,
          AspectoPositivo,
          MelhoriaIdentificada,
          AlteracaoEfetivo,
          OutraAlteracao,
        ],
        synchronize: false,
        logging: true,
      }),
    }),
    EquipeModule,
    OperacaoModule,
    OcorrenciaModule,
    FiscalModule,
    RelatorioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
