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
import { AddArmaToOcorrenciaUseCase } from './modules/ocorrencia/application/usecase/arma/add-arma';
import { DeleteArmaFromOcorrenciaUseCase } from './modules/ocorrencia/application/usecase/arma/delete-arma';
import { Arma } from './modules/ocorrencia/domain/entities/arma';
import { Droga } from './modules/ocorrencia/domain/entities/droga';
import { AddDrogaToOcorrenciaUseCase } from './modules/ocorrencia/application/usecase/droga/add-droga';
import { DrogaController } from './modules/ocorrencia/infra/controller/DrogaController';
import { DeleteDrogaFromOcorrenciaUseCase } from './modules/ocorrencia/application/usecase/droga/delete-droga';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ocorrencia, Arma, Droga]),
    OperacaoModule,
  ],
  controllers: [OcorrenciaController, ArmaController, DrogaController],
  providers: [
    CreateOcorrenciaUseCase,
    UpdateOcorrenciaUseCase,
    ListOcorrenciasUseCase,
    ShowOcorrenciaUseCase,
    DeleteOcorrenciaUseCase,
    FindOcorrenciaByMUseCase,
    UpdateArmaUseCase,
    AddArmaToOcorrenciaUseCase,
    DeleteArmaFromOcorrenciaUseCase,
    AddDrogaToOcorrenciaUseCase,
    DeleteDrogaFromOcorrenciaUseCase,
    {
      provide: 'IOcorrenciaRepository',
      useClass: OcorrenciaRepository,
    },
  ],
})
export class OcorrenciaModule {}
