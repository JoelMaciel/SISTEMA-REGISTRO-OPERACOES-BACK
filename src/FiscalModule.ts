import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fiscal } from './modules/fiscal/domain/entities/fiscal';
import { FiscalController } from './modules/fiscal/infra/controller/FiscalController';
import { CreateFiscalUseCase } from './modules/fiscal/application/usecases/equipe/create-fiscal';
import { FiscalRepository } from './modules/fiscal/infra/repository/FiscalRepository';

@Module({
  imports: [TypeOrmModule.forFeature([Fiscal])],
  controllers: [FiscalController],
  providers: [
    CreateFiscalUseCase,

    {
      provide: 'IFiscalRepository',
      useClass: FiscalRepository,
    },
  ],
})
export class FiscalModule {}
