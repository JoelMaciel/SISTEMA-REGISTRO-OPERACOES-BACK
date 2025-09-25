import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import {
  CreateOperacaoRequestDTO,
  CreateOperacaoSchema,
} from '../../application/dto/schema/CreateOperacaoSchema';
import { OperacaoResponseDTO } from '../../application/dto/response/OperacaoResponseDTO';
import { ValidateSchema } from 'src/shared/validation/ValidationSchema';
import { CriarOperacaoUseCase } from '../../application/usecase/operacao/create-operacao';
import { UpdateOperacaoUseCase } from '../../application/usecase/operacao/update-operacao';
import {
  UpdateOperacaoRequestDTO,
  UpdateOperacaoSchema,
} from '../../application/dto/schema/UpdateOperacaoSchema';
import { ListOperacaoUseCase } from '../../application/usecase/operacao/list-operacao';
import { ShowOperacaoUseCase } from '../../application/usecase/operacao/show-operacao';

@Controller('api/operacoes')
export class OperacaoController {
  constructor(
    private readonly criarOperacaoUseCase: CriarOperacaoUseCase,
    private readonly listOperacaoUseCase: ListOperacaoUseCase,
    private readonly updateOperacaoUseCase: UpdateOperacaoUseCase,
    private readonly findByIdOperacaoUseCase: ShowOperacaoUseCase,
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
    );
  }

  @Get(':id')
  async buscarPorId(@Param('id') id: string): Promise<OperacaoResponseDTO> {
    return this.findByIdOperacaoUseCase.execute(id);
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

  // @Put(':operacaoId/postos/:postoId')
  // async atualizarPostoServico(
  //   @Param('operacaoId') operacaoId: string,
  //   @Param('postoId') postoId: string,
  //   @Body() body: PostoServicoRequestDTO,
  // ): Promise<OperacaoResponseDTO> {
  //   const dto = await ValidateSchema.validate(PostoServicoSchema, body);
  //   return this.updatePostoServicoOperacaoUseCase.execute(
  //     operacaoId,
  //     postoId,
  //     dto,
  //   );
  // }

  // @Put(':operacaoId/areas/:areaAtuacaoId')
  // async atualizarAreaAtuacao(
  //   @Param('operacaoId') operacaoId: string,
  //   @Param('areaAtuacaoId') areaAtuacaoId: string,
  //   @Body() body: AreaAtuacaoRequestDTO,
  // ): Promise<OperacaoResponseDTO> {
  //   const dto = await ValidateSchema.validate(AreaAtuacaoSchema, body);

  //   return this.updateAreaAtuacaoOperacaoUseCase.execute(
  //     operacaoId,
  //     areaAtuacaoId,
  //     dto,
  //   );
  // }
}
