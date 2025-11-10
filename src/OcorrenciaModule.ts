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

@Module({
  imports: [TypeOrmModule.forFeature([Ocorrencia]), OperacaoModule],
  controllers: [OcorrenciaController],
  providers: [
    CreateOcorrenciaUseCase,
    UpdateOcorrenciaUseCase,
    ListOcorrenciasUseCase,
    ShowOcorrenciaUseCase,
    {
      provide: 'IOcorrenciaRepository',
      useClass: OcorrenciaRepository,
    },
  ],
})
export class OcorrenciaModule {}
