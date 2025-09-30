import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipe } from './modules/equipe/domain/entities/equipe';
import { EquipeController } from './modules/equipe/infra/controller/EquipeController';
import { CriarEquipeUseCase } from './modules/equipe/application/usecases/equipe/create-equipe';
import { EquipeRepository } from './modules/equipe/infra/repository/EquipeRepository';
import { OperacaoModule } from './OperacaoModule';

@Module({
  imports: [TypeOrmModule.forFeature([Equipe]), OperacaoModule],
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
