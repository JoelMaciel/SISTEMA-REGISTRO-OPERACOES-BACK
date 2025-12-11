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
import { DrogaRequestDTO } from '../../application/dto/schema/CreateOcorrenciaSchema';
import { AddDrogaToOcorrenciaUseCase } from '../../application/usecase/droga/add-droga';
import { DrogaResponseDTO } from '../../application/dto/response/DrogaResponseDTO';
import { DrogaSchema } from '../../application/dto/schema/UpdateOcorrenciaSchema';
import { DeleteDrogaFromOcorrenciaUseCase } from '../../application/usecase/droga/delete-droga';
import { UpdateDrogaUseCase } from '../../application/usecase/droga/update-droga';

@Controller('api/ocorrencias')
export class DrogaController {
  constructor(
    private readonly updateDrogaUseCase: UpdateDrogaUseCase,
    private readonly addDrogaUseCase: AddDrogaToOcorrenciaUseCase,
    private readonly deleteDrogaFromOcorrenciaUseCase: DeleteDrogaFromOcorrenciaUseCase,
  ) {}

  @Post(':ocorrenciaId/drogas')
  @HttpCode(HttpStatus.CREATED)
  async addDroga(
    @Param('ocorrenciaId') ocorrenciaId: string,
    @Body() body: DrogaRequestDTO,
  ): Promise<DrogaResponseDTO> {
    const dto = await ValidateSchema.validate(DrogaSchema, body);
    return this.addDrogaUseCase.execute(ocorrenciaId, dto);
  }

  @Patch(':ocorrenciaId/drogas/:drogaId')
  @HttpCode(HttpStatus.OK)
  async updateDroga(
    @Param('ocorrenciaId') ocorrenciaId: string,
    @Param('drogaId') drogaId: string,
    @Body() body: DrogaRequestDTO,
  ): Promise<DrogaResponseDTO> {
    const dto = await ValidateSchema.validate(DrogaSchema, body);
    return this.updateDrogaUseCase.execute(ocorrenciaId, drogaId, dto);
  }

  @Delete(':ocorrenciaId/drogas/:drogaId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteDroga(
    @Param('ocorrenciaId') ocorrenciaId: string,
    @Param('drogaId') drograId: string,
  ): Promise<void> {
    await this.deleteDrogaFromOcorrenciaUseCase.execute(ocorrenciaId, drograId);
  }
}
