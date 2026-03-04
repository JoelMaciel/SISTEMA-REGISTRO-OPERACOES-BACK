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
  AlteracaoEfetivoRequestDTO,
  AlteracaoEfetivoSchema,
  AspectoPositivoSchema,
  CreateRelatorioRequestDTO,
  CreateRelatorioSchema,
  MelhoriaIdentificadaSchema,
  OutraAlteracaoSchema,
  UpdateAlteracaoEfetivoSchema,
  UpdateDadosGeraisRelatorioSchema,
  UpdateRelatorioRequestDTO,
} from '../../application/dto/shemas/types';
import { ListarRelatoriosUseCase } from '../../application/usecases/list-relatorio';
import { ShowRelatoriodUseCase } from '../../application/usecases/show-relatorio';
import { DeleteRelatorioUseCase } from '../../application/usecases/delete-relatorio';
import { GerarPdfRelatorioUseCase } from '../../application/usecases/relatorio-pdf';
import { Response } from 'express';
import { UpdateDadosGeraisRelatorioUseCase } from '../../application/usecases/UpdateDadosGeraisRelatorioUseCase.ts';
import { UpdateAlteracaoEfetivoUseCase } from '../../application/usecases/alteraca-efetivo/update-alteracao-efetivo';
import { DeleteAlteracaoEfetivoUseCase } from '../../application/usecases/alteraca-efetivo/delete-alteracao-efetico';
import { CreateAlteracaoEfetivoUseCase } from '../../application/usecases/alteraca-efetivo/create-alteracao-efetivo';
import { CreateAspectoPositivoUseCase } from '../../application/usecases/aspecto-positivo/create-aspecto';
import { UpdateAspectoPositivoUseCase } from '../../application/usecases/aspecto-positivo/update-aspecto';
import { DeleteAspectoPositivoUseCase } from '../../application/usecases/aspecto-positivo/delete-aspecto';
import { CreateMelhoriaIdentificadaUseCase } from '../../application/usecases/melhoria-identificada/create-melhoria';
import { UpdateMelhoriaIdentificadaUseCase } from '../../application/usecases/melhoria-identificada/update-melhoria';
import { DeleteMelhoriaIdentificadaUseCase } from '../../application/usecases/melhoria-identificada/delete-melhoria';
import { CreateOutraAlteracaoUseCase } from '../../application/usecases/outras-alteracoes/create-outra-alteracao';
import { UpdateOutraAlteracaoUseCase } from '../../application/usecases/outras-alteracoes/update-outra-alteracao';
import { DeleteOutraAlteracaoUseCase } from '../../application/usecases/outras-alteracoes/delete-outra-alteracao';

@Controller('api/relatorios')
export class RelatorioController {
  constructor(
    private readonly createRelatorioUseCase: CreateRelatorioUseCase,
    private readonly listRelatorioUseCase: ListarRelatoriosUseCase,
    private readonly showRelatorioUseCase: ShowRelatoriodUseCase,
    private readonly deleteRelatorioUseCase: DeleteRelatorioUseCase,
    private readonly gerarPdfRelatorioUseCase: GerarPdfRelatorioUseCase,
    private readonly updateDadosGeraisUseCase: UpdateDadosGeraisRelatorioUseCase,
    private readonly updateAlteracaoEfetivoUse: UpdateAlteracaoEfetivoUseCase,
    private readonly deleteAlteracaoEfetivoUse: DeleteAlteracaoEfetivoUseCase,
    private readonly createAlteracaoEfetivoUse: CreateAlteracaoEfetivoUseCase,
    private readonly createAspectoPositivoUseCase: CreateAspectoPositivoUseCase,
    private readonly updateAspectoPositivoUseCase: UpdateAspectoPositivoUseCase,
    private readonly deleteAspectoPositivoUseCase: DeleteAspectoPositivoUseCase,
    private readonly createMelhoriaIdentificadaUseCase: CreateMelhoriaIdentificadaUseCase,
    private readonly updateMelhoriaIdentificadaUseCase: UpdateMelhoriaIdentificadaUseCase,
    private readonly deleteMelhoriaIdentificadaUseCase: DeleteMelhoriaIdentificadaUseCase,
    private readonly createOutraAlteracaoUseCase: CreateOutraAlteracaoUseCase,
    private readonly updateOutraAlteracaoUseCase: UpdateOutraAlteracaoUseCase,
    private readonly deleteOutraAlteracaoUseCase: DeleteOutraAlteracaoUseCase,
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

  @Patch(':relatorioId/alteracoes-efetivo/:alteracaoId')
  async updateAlteracao(
    @Param('relatorioId') relatorioId: string,
    @Param('alteracaoId') alteracaoId: string,
    @Body() body: AlteracaoEfetivoRequestDTO,
  ) {
    const dto = await ValidateSchema.validate(
      UpdateAlteracaoEfetivoSchema,
      body,
    );
    return await this.updateAlteracaoEfetivoUse.execute(
      relatorioId,
      alteracaoId,
      dto,
    );
  }

  @Delete(':relatorioId/alteracoes-efetivo/:alteracaoId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlteracao(
    @Param('relatorioId') relatorioId: string,
    @Param('alteracaoId') alteracaoId: string,
  ) {
    return await this.deleteAlteracaoEfetivoUse.execute(
      relatorioId,
      alteracaoId,
    );
  }

  @Post(':relatorioId/alteracoes-efetivo')
  @HttpCode(HttpStatus.CREATED)
  async createAlteracao(
    @Param('relatorioId') relatorioId: string,
    @Body() body: AlteracaoEfetivoRequestDTO,
  ) {
    const dto = await ValidateSchema.validate(AlteracaoEfetivoSchema, body);

    return await this.createAlteracaoEfetivoUse.execute(relatorioId, dto);
  }

  @Post(':relatorioId/aspectos-positivos')
  async createAspecto(
    @Param('relatorioId') relatorioId: string,
    @Body() body: any,
  ) {
    const dto = await ValidateSchema.validate(AspectoPositivoSchema, body);
    return await this.createAspectoPositivoUseCase.execute(relatorioId, dto);
  }

  @Patch(':relatorioId/aspectos-positivos/:aspectoId')
  async updateAspecto(
    @Param('relatorioId') relatorioId: string,
    @Param('aspectoId') aspectoId: string,
    @Body() body: any,
  ) {
    const dto = await ValidateSchema.validate(AspectoPositivoSchema, body);
    return await this.updateAspectoPositivoUseCase.execute(
      relatorioId,
      aspectoId,
      dto,
    );
  }

  @Delete(':relatorioId/aspectos-positivos/:aspectoId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAspecto(
    @Param('relatorioId') relatorioId: string,
    @Param('aspectoId') aspectoId: string,
  ) {
    return await this.deleteAspectoPositivoUseCase.execute(
      relatorioId,
      aspectoId,
    );
  }

  @Post(':relatorioId/melhorias')
  async createMelhoria(
    @Param('relatorioId') relatorioId: string,
    @Body() body: any,
  ) {
    const dto = await ValidateSchema.validate(MelhoriaIdentificadaSchema, body);
    return await this.createMelhoriaIdentificadaUseCase.execute(
      relatorioId,
      dto,
    );
  }

  @Patch(':relatorioId/melhorias/:melhoriaId')
  async updateMelhoria(
    @Param('relatorioId') relatorioId: string,
    @Param('melhoriaId') melhoriaId: string,
    @Body() body: any,
  ) {
    const dto = await ValidateSchema.validate(MelhoriaIdentificadaSchema, body);
    return await this.updateMelhoriaIdentificadaUseCase.execute(
      relatorioId,
      melhoriaId,
      dto,
    );
  }

  @Delete(':relatorioId/melhorias/:melhoriaId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMelhoria(
    @Param('relatorioId') relatorioId: string,
    @Param('melhoriaId') melhoriaId: string,
  ) {
    return await this.deleteMelhoriaIdentificadaUseCase.execute(
      relatorioId,
      melhoriaId,
    );
  }

  @Post(':relatorioId/outras-alteracoes')
  async createOutraAlteracao(
    @Param('relatorioId') relatorioId: string,
    @Body() body: any,
  ) {
    const dto = await ValidateSchema.validate(OutraAlteracaoSchema, body);
    return await this.createOutraAlteracaoUseCase.execute(relatorioId, dto);
  }

  @Patch(':relatorioId/outras-alteracoes/:alteracaoId')
  async updateOutraAlteracao(
    @Param('relatorioId') relatorioId: string,
    @Param('alteracaoId') alteracaoId: string,
    @Body() body: any,
  ) {
    const dto = await ValidateSchema.validate(OutraAlteracaoSchema, body);
    return await this.updateOutraAlteracaoUseCase.execute(
      relatorioId,
      alteracaoId,
      dto,
    );
  }

  @Delete(':relatorioId/outras-alteracoes/:alteracaoId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOutraAlteracao(
    @Param('relatorioId') relatorioId: string,
    @Param('alteracaoId') alteracaoId: string,
  ) {
    return await this.deleteOutraAlteracaoUseCase.execute(
      relatorioId,
      alteracaoId,
    );
  }
}
