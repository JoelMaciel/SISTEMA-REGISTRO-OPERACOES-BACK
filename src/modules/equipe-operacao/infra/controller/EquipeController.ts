import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CriarEquipeUseCase } from '../../application/usecases/criar-equipe';
import { EquipeResponseDTO } from '../../application/dto/response/EquipeResponseDTO';
import {
  CreateEquipeRequestDTO,
  CreateEquipeSchema,
} from '../../application/dto/shemas/CreateEquipeSchema';
import { ValidateSchema } from 'src/shared/validation/ValidationSchema';
import { ListarEquipeUseCase } from '../../application/usecases/listar-equipe';

@Controller('api/equipes')
export class EquipeController {
  constructor(
    private readonly criarEquipeUseCase: CriarEquipeUseCase,
    private readonly listarEquipeUseCase: ListarEquipeUseCase,
  ) {}

  @Post()
  async create(@Body() body: unknown): Promise<EquipeResponseDTO> {
    const dto: CreateEquipeRequestDTO = await ValidateSchema.validate(
      CreateEquipeSchema,
      body,
    );
    return this.criarEquipeUseCase.execute(dto);
  }

  @Get()
  async listarEquipes(
    @Query('page') page: number,
    @Query('size') limit: number,
    @Query() filtros: any,
  ) {
    return this.listarEquipeUseCase.execute(page, limit, filtros);
  }
}
