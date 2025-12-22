import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
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
} from '../../application/dto/shemas/CreateRelatorioSchema';
import { ListarRelatoriosUseCase } from '../../application/usecases/list-relatorio';
import { ShowRelatoriodUseCase } from '../../application/usecases/show-relatorio';
import { DeleteRelatorioUseCase } from '../../application/usecases/delete-relatorio';
import { GerarPdfRelatorioUseCase } from '../../application/usecases/relatorio-pdf';
import { Response } from 'express';

@Controller('api/relatorios')
export class RelatorioController {
  constructor(
    private readonly createRelatorioUseCase: CreateRelatorioUseCase,
    private readonly listRelatorioUseCase: ListarRelatoriosUseCase,
    private readonly showRelatorioUseCase: ShowRelatoriodUseCase,
    private readonly deleteRelatorioUseCase: DeleteRelatorioUseCase,
    private readonly gerarPdfRelatorioUseCase: GerarPdfRelatorioUseCase,
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
