import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { Operacao } from 'src/modules/operacao/domain/entities/operacao';
import { PostoArea } from 'src/modules/operacao/domain/entities/posto-area';
import { Equipe } from 'src/modules/equipe/domain/entities/equipe';

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
  entities: [Operacao, PostoArea, Equipe],
  migrations: ['src/database/migrations/*.ts'],
  subscribers: [],
};
