import { Body, Controller, Post } from '@nestjs/common';
import { CriarEquipeUseCase } from '../../application/usecases/criar-equipe';
import { EquipeResponseDTO } from '../../application/dto/response/EquipeResponseDTO';
import {
  CreateEquipeRequestDTO,
  CreateEquipeSchema,
} from '../../application/dto/shemas/CreateEquipeSchema';
import { ValidateSchema } from 'src/shared/validation/ValidationSchema';

@Controller('api/equipes')
export class EquipeController {
  constructor(private readonly criarEquipeUseCase: CriarEquipeUseCase) {}

  @Post()
  async create(@Body() body: unknown): Promise<EquipeResponseDTO> {
    const dto: CreateEquipeRequestDTO = await ValidateSchema.validate(
      CreateEquipeSchema,
      body,
    );
    return this.criarEquipeUseCase.execute(dto);
  }
}
