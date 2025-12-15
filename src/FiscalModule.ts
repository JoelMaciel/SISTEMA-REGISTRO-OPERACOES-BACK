import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fiscal } from './modules/fiscal/domain/entities/fiscal';
import { FiscalController } from './modules/fiscal/infra/controller/FiscalController';
import { FiscalRepository } from './modules/fiscal/infra/repository/FiscalRepository';
import { ShowFiscalUseCase } from './modules/fiscal/application/usecases/show-fiscal';
import { ListarFiscalUseCase } from './modules/fiscal/application/usecases/list-fiscal';
import { CreateFiscalUseCase } from './modules/fiscal/application/usecases/create-fiscal';
import { UpdateFiscalUseCase } from './modules/fiscal/application/usecases/update-fiscal';
import { DeleteFiscalUseCase } from './modules/fiscal/application/usecases/delete-fiscal';

@Module({
  imports: [TypeOrmModule.forFeature([Fiscal])],
  controllers: [FiscalController],
  providers: [
    CreateFiscalUseCase,
    ShowFiscalUseCase,
    ListarFiscalUseCase,
    UpdateFiscalUseCase,
    DeleteFiscalUseCase,

    {
      provide: 'IFiscalRepository',
      useClass: FiscalRepository,
    },
  ],
})
export class FiscalModule {}
