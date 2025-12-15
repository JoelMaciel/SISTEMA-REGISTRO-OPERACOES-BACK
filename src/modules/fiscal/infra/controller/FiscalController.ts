import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  HttpCode,
} from '@nestjs/common';
import { ValidateSchema } from 'src/shared/validation/ValidationSchema'; // Importação presumida
import { CreateFiscalUseCase } from '../../application/usecases/equipe/create-fiscal';
import {
  CreateFiscalRequestDTO,
  CreateFiscalSchema,
} from '../../application/dto/shemas/CreateFiscalSchema';
import { FiscalResponseDTO } from '../../application/dto/response/FiscalResponseDTO';
import { ShowFiscalUseCase } from '../../application/usecases/equipe/show-fiscal';
import { ListarFiscalUseCase } from '../../application/usecases/equipe/list-fiscal';

@Controller('api/fiscais')
export class FiscalController {
  constructor(
    private readonly createFiscalUseCase: CreateFiscalUseCase,
    private readonly showFiscalUseCase: ShowFiscalUseCase,
    private readonly listarFiscalUseCase: ListarFiscalUseCase,
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
  async listar(
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

  // /**
  //  * Atualiza um Fiscal por ID.
  //  * Rota: PUT /api/fiscais/:id
  //  */
  // @Put(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() body: CreateFiscalRequestDTO, // Reutiliza o DTO de criação para atualização
  // ): Promise<FiscalResponseDTO> {
  //   const dto: CreateFiscalRequestDTO = await ValidateSchema.validate(
  //     CreateFiscalSchema.partial(), // Permite campos parciais para UPDATE (opcional)
  //     body,
  //   );
  //   return this.updateFiscalUseCase.execute(id, dto);
  // }

  // /**
  //  * Deleta um Fiscal por ID.
  //  * Rota: DELETE /api/fiscais/:id
  //  */
  // @Delete(':id')
  // @HttpCode(204) // Retorna 204 No Content para sucesso de exclusão
  // async delete(@Param('id') id: string): Promise<void> {
  //   // Implementação de um Use Case de exclusão
  //   // return this.deleteFiscalUseCase.execute(id);
  // }
}
