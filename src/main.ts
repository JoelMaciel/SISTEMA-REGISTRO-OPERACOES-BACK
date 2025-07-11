import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from 'ormconfig';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  try {
    await AppDataSource.initialize();
    console.log('📦 Conectado ao banco de dados!');
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
    console.log('🚀 Servidor rodando na porta 3000');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados', error);
  }
}
bootstrap();
