import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { Operacao } from 'src/modules/operacao/domain/entities/operacao';
import { PostoArea } from 'src/modules/operacao/domain/entities/posto-area';
import { Equipe } from 'src/modules/equipe/domain/entities/equipe';
import { Ocorrencia } from 'src/modules/ocorrencia/domain/entities/ocorrencia';
import { Vitima } from 'src/modules/ocorrencia/domain/entities/vitima';
import { Acusado } from 'src/modules/ocorrencia/domain/entities/acusado';
import { Droga } from 'src/modules/ocorrencia/domain/entities/droga';
import { Endereco } from 'src/modules/ocorrencia/domain/entities/Endereco';
import { OutroObjeto } from 'src/modules/ocorrencia/domain/entities/outroObjeto';
import { Municao } from 'src/modules/ocorrencia/domain/entities/municao';
import { Dinheiro } from 'src/modules/ocorrencia/domain/entities/dinheiro';
import { Arma } from 'src/modules/ocorrencia/domain/entities/arma';
import { Veiculo } from 'src/modules/ocorrencia/domain/entities/veiculo';

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
  ],
  migrations: ['src/database/migrations/*.ts'],
  subscribers: [],
};
