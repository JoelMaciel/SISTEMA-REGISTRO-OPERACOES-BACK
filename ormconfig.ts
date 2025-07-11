import { databaseConfig } from 'database.config';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource(databaseConfig);
