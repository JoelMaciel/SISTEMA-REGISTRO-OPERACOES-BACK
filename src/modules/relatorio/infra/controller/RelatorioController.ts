import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ValidateSchema } from 'src/shared/validation/ValidationSchema';
import { RelatorioResponseDTO } from '../../application/dto/response/RelatorioResponseDTO';
import { CreateRelatorioUseCase } from '../../application/usecases/equipe/create-relatorio';
import {
  CreateRelatorioRequestDTO,
  CreateRelatorioSchema,
} from '../../application/dto/shemas/CreateRelatorioSchema';

@Controller('api/relatorios')
export class RelatorioController {
  constructor(
    private readonly createRelatorioUseCase: CreateRelatorioUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() body: CreateRelatorioRequestDTO,
  ): Promise<RelatorioResponseDTO> {
    const dto: CreateRelatorioRequestDTO = await ValidateSchema.validate(
      CreateRelatorioSchema,
      body,
    );

    return this.createRelatorioUseCase.execute(dto);
  }
}
