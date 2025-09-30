import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { OperacaoModule } from './OperacaoModule';
import { Operacao } from './modules/operacao/domain/entities/operacao';
import { PostoArea } from './modules/operacao/domain/entities/posto-area';
import { EquipeModule } from './EquipeModule';
import { Equipe } from './modules/equipe/domain/entities/equipe';

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
        entities: [Operacao, PostoArea, Equipe],
        synchronize: false,
        logging: true,
      }),
    }),
    EquipeModule,
    OperacaoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
