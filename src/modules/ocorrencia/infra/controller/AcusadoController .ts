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

@Controller('api/ocorrencias')
export class AcusadoController {
  constructor(
    // private readonly updateVitimaUseCase: UpdateVitimaUseCase,
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

  // @Patch(':ocorrenciaId/vitimas/:vitimasId')
  // @HttpCode(HttpStatus.OK)
  // async updateVitimas(
  //   @Param('ocorrenciaId') ocorrenciaId: string,
  //   @Param('vitimasId') vitimasId: string,
  //   @Body() body: VitimaRequestDTO,
  // ): Promise<VitimaResponseDTO> {
  //   const dto = await ValidateSchema.validate(VitimaSchema, body);
  //   return this.updateVitimaUseCase.execute(ocorrenciaId, vitimasId, dto);
  // }

  @Delete(':ocorrenciaId/acusados/:acusadoId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteVitimas(
    @Param('ocorrenciaId') ocorrenciaId: string,
    @Param('acusadoId') acusadoId: string,
  ): Promise<void> {
    await this.deleteAcusadoUseCase.execute(ocorrenciaId, acusadoId);
  }
}
