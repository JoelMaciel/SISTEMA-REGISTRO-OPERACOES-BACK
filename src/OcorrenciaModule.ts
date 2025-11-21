import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperacaoModule } from './OperacaoModule';
import { OcorrenciaController } from './modules/ocorrencia/infra/controller/OcorrenciaController';
import { CreateOcorrenciaUseCase } from './modules/ocorrencia/application/usecase/ocorrencia/create-ocorrencia';
import { OcorrenciaRepository } from './modules/ocorrencia/infra/repository/OcorrenciaRepository';
import { Ocorrencia } from './modules/ocorrencia/domain/entities/ocorrencia';
import { UpdateOcorrenciaUseCase } from './modules/ocorrencia/application/usecase/ocorrencia/update-ocorrencia';
import { ListOcorrenciasUseCase } from './modules/ocorrencia/application/usecase/ocorrencia/list-ocorrencia';
import { ShowOcorrenciaUseCase } from './modules/ocorrencia/application/usecase/ocorrencia/show-ocorrencia';
import { DeleteOcorrenciaUseCase } from './modules/ocorrencia/application/usecase/ocorrencia/delete-ocorrencia';
import { FindOcorrenciaByMUseCase } from './modules/ocorrencia/application/usecase/ocorrencia/find-m-ocorrencia';
import { UpdateArmaUseCase } from './modules/ocorrencia/application/usecase/arma/update-arma';
import { ArmaController } from './modules/ocorrencia/infra/controller/ArmaController';

@Module({
  imports: [TypeOrmModule.forFeature([Ocorrencia]), OperacaoModule],
  controllers: [OcorrenciaController, ArmaController],
  providers: [
    CreateOcorrenciaUseCase,
    UpdateOcorrenciaUseCase,
    ListOcorrenciasUseCase,
    ShowOcorrenciaUseCase,
    DeleteOcorrenciaUseCase,
    FindOcorrenciaByMUseCase,
    UpdateArmaUseCase,
    {
      provide: 'IOcorrenciaRepository',
      useClass: OcorrenciaRepository,
    },
  ],
})
export class OcorrenciaModule {}
