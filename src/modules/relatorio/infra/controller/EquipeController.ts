// import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
// import { CriarEquipeUseCase } from '../../application/usecases/equipe/create-equipe';
// import { EquipeResponseDTO } from '../../application/dto/response/EquipeResponseDTO';
// import {
//   CreateEquipeRequestDTO,
//   CreateEquipeSchema,
// } from '../../application/dto/shemas/CreateEquipeSchema';
// import { ValidateSchema } from 'src/shared/validation/ValidationSchema';
// import { ShowEquipeUseCase } from '../../application/usecases/equipe/show-equipe';
// import { ListarEquipeUseCase } from '../../application/usecases/equipe/list-equipe';
// import { UpdateEquipeUseCase } from '../../application/usecases/equipe/update-equipe';

// @Controller('api/equipes')
// export class EquipeController {
//   constructor(
//     private readonly createEquipeUseCase: CriarEquipeUseCase,
//     private readonly showEquipeUseCase: ShowEquipeUseCase,
//     private readonly listarEquipeUseCase: ListarEquipeUseCase,
//     private readonly updateEquipeUseCase: UpdateEquipeUseCase,
//   ) {}

//   @Post(':operacaoId')
//   async create(
//     @Param('operacaoId') operacaoId: string,
//     @Body() body: CreateEquipeRequestDTO,
//   ): Promise<EquipeResponseDTO> {
//     const dto: CreateEquipeRequestDTO = await ValidateSchema.validate(
//       CreateEquipeSchema,
//       body,
//     );
//     return this.createEquipeUseCase.execute(operacaoId, dto);
//   }

//   @Get()
//   async listar(
//     @Query('page') page = 1,
//     @Query('limit') limit = 10,
//     @Query('matriculaComandante') matriculaComandante?: string,
//     @Query('dataOperacao') dataOperacao?: string,
//     @Query('nomeOperacao') nomeOperacao?: string,
//     @Query('opmGuarnicao') opmGuarnicao?: string,
//     @Query('prefixoVtr') prefixoVtr?: string,
//     @Query('logradouro') logradouro?: string,
//   ) {
//     return this.listarEquipeUseCase.execute(
//       page,
//       limit,
//       matriculaComandante,
//       dataOperacao,
//       nomeOperacao,
//       opmGuarnicao,
//       prefixoVtr,
//       logradouro,
//     );
//   }

//   @Get(':id')
//   async findById(@Param('id') id: string): Promise<EquipeResponseDTO> {
//     return this.showEquipeUseCase.execute(id);
//   }

//   @Put(':id')
//   async update(
//     @Param('id') id: string,
//     @Body() body: CreateEquipeRequestDTO,
//   ): Promise<EquipeResponseDTO> {
//     const dto: CreateEquipeRequestDTO = await ValidateSchema.validate(
//       CreateEquipeSchema,
//       body,
//     );
//     return this.updateEquipeUseCase.execute(id, dto);
//   }
// }
