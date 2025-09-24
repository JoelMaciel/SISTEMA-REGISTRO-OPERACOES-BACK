// import { Module } from '@nestjs/common';
// // import { EquipeController } from './modules/equipe-operacao/infra/controller/EquipeController';
// // import { EquipeRepository } from './modules/equipe-operacao/infra/repository/EquipeRepository';
// // import { CriarEquipeUseCase } from './modules/equipe-operacao/application/usecases/equipe/create-equipe';
// // import { TypeOrmModule } from '@nestjs/typeorm';
// // import { EquipeOperacao } from './modules/equipe-operacao/domain/entities/equipe-operacao';
// // import { ListarEquipeUseCase } from './modules/equipe-operacao/application/usecases/equipe/list-equipe';
// // import { UpdateEquipeUseCase } from './modules/equipe-operacao/application/usecases/equipe/update-equipe';
// // import { ShowEquipeUseCase } from './modules/equipe-operacao/application/usecases/equipe/show-equipe';

// @Module({
//   imports: [TypeOrmModule.forFeature([EquipeOperacao])],
//   controllers: [EquipeController],
//   providers: [
//     CriarEquipeUseCase,
//     ListarEquipeUseCase,
//     UpdateEquipeUseCase,
//     ShowEquipeUseCase,
//     {
//       provide: 'IEquipeRepository',
//       useClass: EquipeRepository,
//     },
//   ],
// })
// export class EquipeModule {}
