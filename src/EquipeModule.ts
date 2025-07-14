import { Module } from '@nestjs/common';
import { EquipeController } from './modules/equipe-operacao/infra/controller/EquipeController';
import { EquipeRepository } from './modules/equipe-operacao/infra/repository/EquipeRepository';
import { CriarEquipeUseCase } from './modules/equipe-operacao/application/usecases/criar-equipe';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipeOperacao } from './modules/equipe-operacao/domain/entities/equipe-operacao';

@Module({
  imports: [TypeOrmModule.forFeature([EquipeOperacao])],
  controllers: [EquipeController],
  providers: [
    CriarEquipeUseCase,
    {
      provide: 'IEquipeRepository',
      useClass: EquipeRepository,
    },
  ],
})
export class EquipeModule {}
