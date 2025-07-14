import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { AppExceptionFilter } from './shared/errors/AppExceptionFilter';

dotenv.config();

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new AppExceptionFilter());
    await app.listen(3000);
    console.log('📦 Conectado ao banco de dados!');
    console.log('🚀 Servidor rodando na porta 3000');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados', error);
  }
}
bootstrap();
