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
import { UpdateDrogaUseCase } from './modules/ocorrencia/application/usecase/droga/update-droga';
import { Veiculo } from './modules/ocorrencia/domain/entities/veiculo';
import { AddVeiculoToOcorrenciaUseCase } from './modules/ocorrencia/application/usecase/veiculo/add-veiculo';
import { VeiculoController } from './modules/ocorrencia/infra/controller/VeiculoController';
import { DeleteVeiculoFromOcorrenciaUseCase } from './modules/ocorrencia/application/usecase/veiculo/delete-veiculo';
import { UpdateVeiculoUseCase } from './modules/ocorrencia/application/usecase/veiculo/update-veiculo';
import { Municao } from './modules/ocorrencia/domain/entities/municao';
import { AddMunicaoToOcorrenciaUseCase } from './modules/ocorrencia/application/usecase/municao/add-municao';
import { MunicaoController } from './modules/ocorrencia/infra/controller/MunicaoController';
import { DeleteMunicaoFromOcorrenciaUseCase } from './modules/ocorrencia/application/usecase/municao/delete-municao';
import { UpdateMunicaoUseCase } from './modules/ocorrencia/application/usecase/municao/update-municao';
import { Dinheiro } from './modules/ocorrencia/domain/entities/dinheiro';
import { AddDinheiroOcorrenciaUseCase } from './modules/ocorrencia/application/usecase/dinheiro/add-dinheiro';
import { DinheiroController } from './modules/ocorrencia/infra/controller/DinheiroController';
import { DeleteDinheiroOcorrenciaUseCase } from './modules/ocorrencia/application/usecase/dinheiro/delete-dinheiro';
import { UpdateDinheiroUseCase } from './modules/ocorrencia/application/usecase/dinheiro/update-dinheiro';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Ocorrencia,
      Arma,
      Droga,
      Veiculo,
      Municao,
      Dinheiro,
    ]),
    OperacaoModule,
  ],
  controllers: [
    OcorrenciaController,
    ArmaController,
    DrogaController,
    VeiculoController,
    MunicaoController,
    DinheiroController,
  ],
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
    UpdateDrogaUseCase,
    AddVeiculoToOcorrenciaUseCase,
    DeleteVeiculoFromOcorrenciaUseCase,
    UpdateVeiculoUseCase,
    AddMunicaoToOcorrenciaUseCase,
    DeleteMunicaoFromOcorrenciaUseCase,
    UpdateMunicaoUseCase,
    AddDinheiroOcorrenciaUseCase,
    DeleteDinheiroOcorrenciaUseCase,
    UpdateDinheiroUseCase,
    {
      provide: 'IOcorrenciaRepository',
      useClass: OcorrenciaRepository,
    },
  ],
})
export class OcorrenciaModule {}
