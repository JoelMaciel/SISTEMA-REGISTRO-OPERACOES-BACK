import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  CreateOperacaoRequestDTO,
  CreateOperacaoSchema,
} from '../../application/dto/schema/CreateOperacaoSchema';
import { OperacaoResponseDTO } from '../../application/dto/response/OperacaoResponseDTO';
import { ValidateSchema } from 'src/shared/validation/ValidationSchema';
import { CriarOperacaoUseCase } from '../../application/usecase/operacao/create-operacao';
import { ListOperacaoUseCase } from '../../application/usecase/operacao/list-operacao';

@Controller('api/operacoes')
export class OperacaoController {
  constructor(
    private readonly criarOperacaoUseCase: CriarOperacaoUseCase,
    private readonly listOperacaoUseCase: ListOperacaoUseCase,
  ) {}

  @Get()
  async listarOperacoes(
    @Query('pageIndex') pageIndex?: string,
    @Query('limit') limit?: string,
    @Query('nome') nome?: string,
    @Query('opmDemandante') opmDemandante?: string,
    @Query('dataInicialStart') dataInicialStart?: string,
    @Query('dataInicialEnd') dataInicialEnd?: string,
    @Query('dataFinalStart') dataFinalStart?: string,
    @Query('dataFinalEnd') dataFinalEnd?: string,
    @Query('postoServico') postoServico?: string,
    @Query('areaAtuacao') areaAtuacao?: string,
  ) {
    const page = parseInt(pageIndex ?? '1', 10);
    const lim = parseInt(limit ?? '10', 10);

    return this.listOperacaoUseCase.execute(
      page,
      lim,
      nome,
      opmDemandante,
      dataInicialStart,
      dataInicialEnd,
      dataFinalStart,
      dataFinalEnd,
      postoServico,
      areaAtuacao,
    );
  }

  @Post()
  async create(
    @Body() body: CreateOperacaoRequestDTO,
  ): Promise<OperacaoResponseDTO> {
    const dto = await ValidateSchema.validate(CreateOperacaoSchema, body);
    return this.criarOperacaoUseCase.execute(dto);
  }
}
