import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipe } from './modules/equipe/domain/entities/equipe';
import { EquipeController } from './modules/equipe/infra/controller/EquipeController';
import { CriarEquipeUseCase } from './modules/equipe/application/usecases/equipe/create-equipe';
import { EquipeRepository } from './modules/equipe/infra/repository/EquipeRepository';
import { OperacaoModule } from './OperacaoModule';
import { ShowEquipeUseCase } from './modules/equipe/application/usecases/equipe/show-equipe';
import { ListarEquipeUseCase } from './modules/equipe/application/usecases/equipe/list-equipe';
import { UpdateEquipeUseCase } from './modules/equipe/application/usecases/equipe/update-equipe';

@Module({
  imports: [TypeOrmModule.forFeature([Equipe]), OperacaoModule],
  controllers: [EquipeController],
  providers: [
    CriarEquipeUseCase,
    ShowEquipeUseCase,
    ListarEquipeUseCase,
    UpdateEquipeUseCase,
    {
      provide: 'IEquipeRepository',
      useClass: EquipeRepository,
    },
  ],
})
export class EquipeModule {}
