// import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
// import { CriarEquipeUseCase } from '../../application/usecases/equipe/create-equipe';
// import { EquipeResponseDTO } from '../../application/dto/response/EquipeResponseDTO';
// import {
//   CreateEquipeRequestDTO,
//   CreateEquipeSchema,
// } from '../../application/dto/shemas/CreateEquipeSchema';
// import { ValidateSchema } from 'src/shared/validation/ValidationSchema';
// import { ListarEquipeUseCase } from '../../application/usecases/equipe/list-equipe';
// import { UpdateEquipeUseCase } from '../../application/usecases/equipe/update-equipe';
// import { ShowEquipeUseCase } from '../../application/usecases/equipe/show-equipe';

// @Controller('api/equipes')
// export class EquipeController {
//   constructor(
//     private readonly criarEquipeUseCase: CriarEquipeUseCase,
//     private readonly listarEquipeUseCase: ListarEquipeUseCase,
//     private readonly updateEquipeUseCase: UpdateEquipeUseCase,
//     private readonly showEquipeUseCase: ShowEquipeUseCase,
//   ) {}

//   @Get()
//   async listarEquipes(
//     @Query('pageIndex') pageIndex?: string,
//     @Query('limit') limit?: string,
//     @Query('matriculaComandante') matriculaComandante?: string,
//     @Query('dataOperacao') dataOperacao?: string,
//     @Query('nomeOperacao') nomeOperacao?: string,
//     @Query('opmGuarnicao') opmGuarnicao?: string,
//     @Query('prefixoVtr') prefixoVtr?: string,
//     @Query('areaAtuacao') areaAtuacao?: string,
//     @Query('tipoServico') tipoServico?: string,
//     @Query('localAtividade') localAtividade?: string,
//     @Query('atividadeRealizada') atividadeRealizada?: string,
//   ) {
//     const pageInt = parseInt(pageIndex ?? '1', 10);
//     const limitInt = parseInt(limit ?? '10', 10);

//     const result = await this.listarEquipeUseCase.execute(
//       pageInt,
//       limitInt,
//       matriculaComandante,
//       dataOperacao,
//       nomeOperacao,
//       opmGuarnicao,
//       prefixoVtr,
//       areaAtuacao,
//       tipoServico,
//       localAtividade,
//       atividadeRealizada,
//     );

//     return result;
//   }

//   @Post()
//   async create(
//     @Body() body: CreateEquipeRequestDTO,
//   ): Promise<EquipeResponseDTO> {
//     const dto: CreateEquipeRequestDTO = await ValidateSchema.validate(
//       CreateEquipeSchema,
//       body,
//     );
//     return this.criarEquipeUseCase.execute(dto);
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
