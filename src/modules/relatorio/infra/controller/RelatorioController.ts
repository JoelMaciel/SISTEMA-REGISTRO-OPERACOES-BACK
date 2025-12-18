import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ValidateSchema } from 'src/shared/validation/ValidationSchema';
import { RelatorioResponseDTO } from '../../application/dto/response/RelatorioResponseDTO';
import { CreateRelatorioUseCase } from '../../application/usecases/equipe/create-relatorio';
import {
  CreateRelatorioRequestDTO,
  CreateRelatorioSchema,
} from '../../application/dto/shemas/CreateRelatorioSchema';
import { ListarRelatoriosUseCase } from '../../application/usecases/equipe/list-relatorio';

@Controller('api/relatorios')
export class RelatorioController {
  constructor(
    private readonly createRelatorioUseCase: CreateRelatorioUseCase,
    private readonly listRelatorioUseCase: ListarRelatoriosUseCase,
  ) {}

  @Get()
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('dataInicial') dataInicial?: string,
    @Query('dataFinal') dataFinal?: string,
    @Query('local') local?: string,
    @Query('operacaoId') operacaoId?: string,
    @Query('fiscalId') fiscalId?: string,
  ) {
    const dInicial = dataInicial ? new Date(dataInicial) : undefined;
    const dFinal = dataFinal ? new Date(dataFinal) : undefined;

    return await this.listRelatorioUseCase.execute(
      Number(page) || 1,
      Number(limit) || 10,
      dInicial,
      dFinal,
      local,
      operacaoId,
      fiscalId,
    );
  }

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
