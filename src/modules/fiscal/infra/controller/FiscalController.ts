import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  HttpCode,
  Patch,
} from '@nestjs/common';
import { ValidateSchema } from 'src/shared/validation/ValidationSchema';
import {
  CreateFiscalRequestDTO,
  CreateFiscalSchema,
} from '../../application/dto/shemas/CreateFiscalSchema';
import { FiscalResponseDTO } from '../../application/dto/response/FiscalResponseDTO';
import { ShowFiscalUseCase } from '../../application/usecases/show-fiscal';
import { ListarFiscalUseCase } from '../../application/usecases/list-fiscal';
import { CreateFiscalUseCase } from '../../application/usecases/create-fiscal';
import { UpdateFiscalUseCase } from '../../application/usecases/update-fiscal';
import { DeleteFiscalUseCase } from '../../application/usecases/delete-fiscal';

@Controller('api/fiscais')
export class FiscalController {
  constructor(
    private readonly createFiscalUseCase: CreateFiscalUseCase,
    private readonly showFiscalUseCase: ShowFiscalUseCase,
    private readonly listarFiscalUseCase: ListarFiscalUseCase,
    private readonly updateFiscalUseCase: UpdateFiscalUseCase,
    private readonly deleteFiscalUseCase: DeleteFiscalUseCase,
  ) {}

  @Post()
  async create(
    @Body() body: CreateFiscalRequestDTO,
  ): Promise<FiscalResponseDTO> {
    const dto: CreateFiscalRequestDTO = await ValidateSchema.validate(
      CreateFiscalSchema,
      body,
    );
    return this.createFiscalUseCase.execute(dto);
  }

  @Get()
  async list(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('nome') nome?: string,
    @Query('matricula') matricula?: string,
    @Query('operacaoId') operacaoId?: string,
  ) {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    return this.listarFiscalUseCase.execute(
      pageNumber,
      limitNumber,
      nome,
      matricula,
      operacaoId,
    );
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<FiscalResponseDTO> {
    return this.showFiscalUseCase.execute(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: CreateFiscalRequestDTO,
  ): Promise<FiscalResponseDTO> {
    const dto: CreateFiscalRequestDTO = await ValidateSchema.validate(
      CreateFiscalSchema,
      body,
    );
    return this.updateFiscalUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    return this.deleteFiscalUseCase.execute(id);
  }
}
