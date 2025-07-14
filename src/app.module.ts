// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EquipeOperacao } from './modules/equipe-operacao/domain/entities/equipe-operacao';
import { EquipeModule } from './EquipeModule';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // <--- carrega o .env automaticamente
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
        entities: [EquipeOperacao],
        synchronize: true,
      }),
    }),
    EquipeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
