import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { OcorrenciaResponseDTO } from '../../application/dto/response/OcorrenciaResponseDTO';
import { ValidateSchema } from 'src/shared/validation/ValidationSchema';
import { CreateOcorrenciaUseCase } from '../../application/usecase/ocorrencia/create-ocorrencia';
import { CreateOperacaoRequestDTO } from 'src/modules/operacao/application/dto/schema/CreateOperacaoSchema';
import { OcorrenciaSchema } from '../../application/dto/schema/CreateOcorrenciaSchema';
import { UpdateOcorrenciaUseCase } from '../../application/usecase/ocorrencia/update-ocorrencia';
import {
  OcorrenciaUpdateSchema,
  UpdateOcorrenciaRequestDTO,
} from '../../application/dto/schema/UpdateOcorrenciaSchema';
import { ListOcorrenciasUseCase } from '../../application/usecase/ocorrencia/list-ocorrencia';

@Controller('api/ocorrencias')
export class OcorrenciaController {
  constructor(
    private readonly createOcorrenciaUseCase: CreateOcorrenciaUseCase,
    private readonly updateOcorreciaUseCase: UpdateOcorrenciaUseCase,
    private readonly listarOcorrenciasUseCase: ListOcorrenciasUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('m') m?: string,
    @Query('tipo') tipo?: string,
    @Query('dataInicio') dataInicio?: string,
    @Query('dataFim') dataFim?: string,
    @Query('nomeVitima') nomeVitima?: string,
    @Query('nomeAcusado') nomeAcusado?: string,
    @Query('tipoArma') tipoArma?: string,
    @Query('calibreArma') calibreArma?: string,
    @Query('numeracaoArma') numeracaoArma?: string,
  ): Promise<{
    items: OcorrenciaResponseDTO[];
    total: number;
    pageIndex: number;
    pageSize: number;
  }> {
    const filtros = {
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      m,
      tipo,
      dataInicio: dataInicio ? new Date(dataInicio) : undefined,
      dataFim: dataFim ? new Date(dataFim) : undefined,
      nomeVitima,
      nomeAcusado,
      tipoArma,
      calibreArma,
      numeracaoArma,
    };

    return this.listarOcorrenciasUseCase.execute(filtros);
  }

  @Post(':operacaoId')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param('operacaoId') operacaoId: string,
    @Body() body: CreateOperacaoRequestDTO,
  ): Promise<OcorrenciaResponseDTO> {
    const dto = await ValidateSchema.validate(OcorrenciaSchema, body);
    return this.createOcorrenciaUseCase.execute(operacaoId, dto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() body: UpdateOcorrenciaRequestDTO,
  ): Promise<OcorrenciaResponseDTO> {
    const dto = await ValidateSchema.validate(OcorrenciaUpdateSchema, body);
    return this.updateOcorreciaUseCase.execute(id, dto);
  }
}
