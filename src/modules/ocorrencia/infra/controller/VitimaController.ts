import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ValidateSchema } from 'src/shared/validation/ValidationSchema';
import {
  VitimaRequestDTO,
  VitimaSchema,
} from '../../application/dto/schema/CreateOcorrenciaSchema';
import { AddVitimaUseCase } from '../../application/usecase/vitimas/add-vitima';
import { DeleteVitimaUseCase } from '../../application/usecase/vitimas/delete-vitima';
import { UpdateVitimaUseCase } from '../../application/usecase/vitimas/update-vitima';
import { VitimaResponseDTO } from '../../application/dto/response/VitimaResponseDTO';

@Controller('api/ocorrencias')
export class VitimaController {
  constructor(
    private readonly updateVitimaUseCase: UpdateVitimaUseCase,
    private readonly addVitimaUseCase: AddVitimaUseCase,
    private readonly deleteVeiculoUseCase: DeleteVitimaUseCase,
  ) {}

  @Post(':ocorrenciaId/vitimas')
  @HttpCode(HttpStatus.CREATED)
  async addVitima(
    @Param('ocorrenciaId') ocorrenciaId: string,
    @Body() body: VitimaRequestDTO,
  ): Promise<VitimaResponseDTO> {
    const dto = await ValidateSchema.validate(VitimaSchema, body);
    return this.addVitimaUseCase.execute(ocorrenciaId, dto);
  }

  @Patch(':ocorrenciaId/vitimas/:vitimasId')
  @HttpCode(HttpStatus.OK)
  async updateVitimas(
    @Param('ocorrenciaId') ocorrenciaId: string,
    @Param('vitimasId') vitimasId: string,
    @Body() body: VitimaRequestDTO,
  ): Promise<VitimaResponseDTO> {
    const dto = await ValidateSchema.validate(VitimaSchema, body);
    return this.updateVitimaUseCase.execute(ocorrenciaId, vitimasId, dto);
  }

  @Delete(':ocorrenciaId/vitimas/:vitimaId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteVitimas(
    @Param('ocorrenciaId') ocorrenciaId: string,
    @Param('vitimaId') vitimaId: string,
  ): Promise<void> {
    await this.deleteVeiculoUseCase.execute(ocorrenciaId, vitimaId);
  }
}
