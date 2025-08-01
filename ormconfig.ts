import { databaseConfig } from 'src/config/database.config';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource(databaseConfig);
