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
  AcusadoRequestDTO,
  AcusadoSchema,
} from '../../application/dto/schema/CreateOcorrenciaSchema';
import { AddAcusadoUseCase } from '../../application/usecase/acusados/add-acusado';
import { AcusadoResponseDTO } from '../../application/dto/response/AcusadoResponseDTO';
import { DeleteAcusadoUseCase } from '../../application/usecase/acusados/delete-acusado';
import { UpdateAcusadoUseCase } from '../../application/usecase/acusados/update-acusado';

@Controller('api/ocorrencias')
export class AcusadoController {
  constructor(
    private readonly updateAcusadoUseCase: UpdateAcusadoUseCase,
    private readonly addAcusadoUseCase: AddAcusadoUseCase,
    private readonly deleteAcusadoUseCase: DeleteAcusadoUseCase,
  ) {}

  @Post(':ocorrenciaId/acusados')
  @HttpCode(HttpStatus.CREATED)
  async addVitima(
    @Param('ocorrenciaId') ocorrenciaId: string,
    @Body() body: AcusadoRequestDTO,
  ): Promise<AcusadoResponseDTO> {
    const dto = await ValidateSchema.validate(AcusadoSchema, body);
    return this.addAcusadoUseCase.execute(ocorrenciaId, dto);
  }

  @Patch(':ocorrenciaId/acusados/:acusadoId')
  @HttpCode(HttpStatus.OK)
  async updateAcusado(
    @Param('ocorrenciaId') ocorrenciaId: string,
    @Param('acusadoId') acusadoId: string,
    @Body() body: AcusadoRequestDTO,
  ): Promise<AcusadoResponseDTO> {
    const dto = await ValidateSchema.validate(AcusadoSchema, body);
    return this.updateAcusadoUseCase.execute(ocorrenciaId, acusadoId, dto);
  }

  @Delete(':ocorrenciaId/acusados/:acusadoId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAcusado(
    @Param('ocorrenciaId') ocorrenciaId: string,
    @Param('acusadoId') acusadoId: string,
  ): Promise<void> {
    await this.deleteAcusadoUseCase.execute(ocorrenciaId, acusadoId);
  }
}
