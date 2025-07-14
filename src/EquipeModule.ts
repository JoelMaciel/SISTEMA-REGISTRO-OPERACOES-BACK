import { Module } from '@nestjs/common';
import { EquipeController } from './modules/equipe-operacao/infra/controller/EquipeController';
import { EquipeRepository } from './modules/equipe-operacao/infra/repository/EquipeRepository';
import { CriarEquipeUseCase } from './modules/equipe-operacao/application/usecases/criar-equipe';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipeOperacao } from './modules/equipe-operacao/domain/entities/equipe-operacao';
import { ListarEquipeUseCase } from './modules/equipe-operacao/application/usecases/listar-equipe';

@Module({
  imports: [TypeOrmModule.forFeature([EquipeOperacao])],
  controllers: [EquipeController],
  providers: [
    CriarEquipeUseCase,
    ListarEquipeUseCase,
    {
      provide: 'IEquipeRepository',
      useClass: EquipeRepository,
    },
  ],
})
export class EquipeModule {}
