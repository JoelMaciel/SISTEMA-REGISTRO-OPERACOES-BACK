import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import {
  CreateOperacaoRequestDTO,
  CreateOperacaoSchema,
} from '../../application/dto/schema/CreateOperacaoSchema';
import { OperacaoResponseDTO } from '../../application/dto/response/OperacaoResponseDTO';
import { ValidateSchema } from 'src/shared/validation/ValidationSchema';
import { CriarOperacaoUseCase } from '../../application/usecase/operacao/create-operacao';
import { ListOperacaoUseCase } from '../../application/usecase/operacao/list-operacao';
import { UpdateOperacaoUseCase } from '../../application/usecase/operacao/update-operacao';
import {
  UpdateOperacaoRequestDTO,
  UpdateOperacaoSchema,
} from '../../application/dto/schema/UpdateOperacaoSchema';

@Controller('api/operacoes')
export class OperacaoController {
  constructor(
    private readonly criarOperacaoUseCase: CriarOperacaoUseCase,
    private readonly listOperacaoUseCase: ListOperacaoUseCase,
    private readonly updateOperacaoUseCase: UpdateOperacaoUseCase,
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

  @Put(':id')
  async atualizarOperacao(
    @Param('id') id: string,
    @Body() body: UpdateOperacaoRequestDTO,
  ): Promise<OperacaoResponseDTO> {
    const dto = await ValidateSchema.validate(UpdateOperacaoSchema, body);
    return this.updateOperacaoUseCase.execute(id, dto);
  }
}
