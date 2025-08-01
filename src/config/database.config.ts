import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { EquipeOperacao } from 'src/modules/equipe-operacao/domain/entities/equipe-operacao';
import { Operacao } from 'src/modules/operacao/domain/entities/operacao';
import { PostoServico } from 'src/modules/operacao/domain/entities/posto-servico';
import { AreaAtuacao } from 'src/modules/operacao/domain/entities/area-atuacao';

dotenv.config();

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [EquipeOperacao, Operacao, PostoServico, AreaAtuacao],
  migrations: ['src/database/migrations/*.ts'],
  subscribers: [],
};
