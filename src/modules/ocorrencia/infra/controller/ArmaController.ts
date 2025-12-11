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
import { ArmaSchema } from '../../application/dto/schema/CreateOcorrenciaSchema';
import { ArmaRequestDTO } from '../../application/dto/schema/UpdateOcorrenciaSchema';

import { UpdateArmaUseCase } from '../../application/usecase/arma/update-arma';
import { ArmaResponseDTO } from '../../application/dto/response/ArmaResponseDTO';
import { AddArmaToOcorrenciaUseCase } from '../../application/usecase/arma/add-arma';
import { DeleteArmaFromOcorrenciaUseCase } from '../../application/usecase/arma/delete-arma';

@Controller('api/ocorrencias')
export class ArmaController {
  constructor(
    private readonly updateArmaUseCase: UpdateArmaUseCase,
    private readonly addArmaUseCase: AddArmaToOcorrenciaUseCase,
    private readonly deleteArmaFromOcorrenciaUseCase: DeleteArmaFromOcorrenciaUseCase,
  ) {}

  @Post(':ocorrenciaId/armas')
  @HttpCode(HttpStatus.CREATED)
  async addArma(
    @Param('ocorrenciaId') ocorrenciaId: string,
    @Body() body: ArmaRequestDTO,
  ): Promise<ArmaResponseDTO> {
    const dto = await ValidateSchema.validate(ArmaSchema, body);
    return this.addArmaUseCase.execute(ocorrenciaId, dto);
  }

  @Patch(':ocorrenciaId/armas/:armaId')
  @HttpCode(HttpStatus.OK)
  async updateArma(
    @Param('ocorrenciaId') ocorrenciaId: string,
    @Param('armaId') armaId: string,
    @Body() body: ArmaRequestDTO,
  ): Promise<ArmaResponseDTO> {
    const dto = await ValidateSchema.validate(ArmaSchema, body);
    return this.updateArmaUseCase.execute(ocorrenciaId, armaId, dto);
  }

  @Delete(':ocorrenciaId/armas/:armaId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArma(
    @Param('ocorrenciaId') ocorrenciaId: string,
    @Param('armaId') armaId: string,
  ): Promise<void> {
    await this.deleteArmaFromOcorrenciaUseCase.execute(ocorrenciaId, armaId);
  }
}
