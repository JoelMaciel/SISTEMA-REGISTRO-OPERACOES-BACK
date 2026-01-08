import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ValidateSchema } from 'src/shared/validation/ValidationSchema';
import { RelatorioResponseDTO } from '../../application/dto/response/RelatorioResponseDTO';
import { CreateRelatorioUseCase } from '../../application/usecases/create-relatorio';
import {
  CreateRelatorioRequestDTO,
  CreateRelatorioSchema,
  UpdateDadosGeraisRelatorioSchema,
  UpdateRelatorioRequestDTO,
} from '../../application/dto/shemas/types';
import { ListarRelatoriosUseCase } from '../../application/usecases/list-relatorio';
import { ShowRelatoriodUseCase } from '../../application/usecases/show-relatorio';
import { DeleteRelatorioUseCase } from '../../application/usecases/delete-relatorio';
import { GerarPdfRelatorioUseCase } from '../../application/usecases/relatorio-pdf';
import { Response } from 'express';
import { UpdateDadosGeraisRelatorioUseCase } from '../../application/usecases/UpdateDadosGeraisRelatorioUseCase.ts';

@Controller('api/relatorios')
export class RelatorioController {
  constructor(
    private readonly createRelatorioUseCase: CreateRelatorioUseCase,
    private readonly listRelatorioUseCase: ListarRelatoriosUseCase,
    private readonly showRelatorioUseCase: ShowRelatoriodUseCase,
    private readonly deleteRelatorioUseCase: DeleteRelatorioUseCase,
    private readonly gerarPdfRelatorioUseCase: GerarPdfRelatorioUseCase,
    private readonly updateDadosGeraisUseCase: UpdateDadosGeraisRelatorioUseCase,
  ) {}

  @Get()
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('dataInicial') dataInicial?: string,
    @Query('dataFinal') dataFinal?: string,
    @Query('local') local?: string,
    @Query('nomeOperacao') nomeOperacao?: string,
    @Query('matriculaFiscal') matriculaFiscal?: string,
  ) {
    const dInicial = dataInicial ? new Date(dataInicial) : undefined;
    const dFinal = dataFinal ? new Date(dataFinal) : undefined;

    return await this.listRelatorioUseCase.execute(
      Number(page) || 1,
      Number(limit) || 10,
      dInicial,
      dFinal,
      local,
      nomeOperacao,
      matriculaFiscal,
    );
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.showRelatorioUseCase.execute(id);
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

  @Patch(':id')
  async updateDadosGerais(
    @Param('id') id: string,
    @Body() body: UpdateRelatorioRequestDTO,
  ) {
    const dto: UpdateRelatorioRequestDTO = await ValidateSchema.validate(
      UpdateDadosGeraisRelatorioSchema,
      body,
    );

    return await this.updateDadosGeraisUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return await this.deleteRelatorioUseCase.execute(id);
  }

  @Get(':id/pdf')
  async exportPdf(@Param('id') id: string, @Res() res: Response) {
    const pdfDoc = await this.gerarPdfRelatorioUseCase.execute(id);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=relatorio-${id}.pdf`,
    });

    pdfDoc.pipe(res);
  }
}
