import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { ValidateSchema } from 'src/shared/validation/ValidationSchema';
import { ArmaSchema } from '../../application/dto/schema/CreateOcorrenciaSchema';
import { ArmaRequestDTO } from '../../application/dto/schema/UpdateOcorrenciaSchema';

import { ArmaResponseDto } from '../../application/dto/response/ArmaResponseDTO';
import { UpdateArmaUseCase } from '../../application/usecase/arma/update-arma';

@Controller('api/ocorrencias')
export class ArmaController {
  constructor(private readonly updateArmaUseCase: UpdateArmaUseCase) {}

  @Patch(':ocorrenciaId/armas/:armaId')
  @HttpCode(HttpStatus.OK)
  async updateArma(
    @Param('ocorrenciaId') ocorrenciaId: string,
    @Param('armaId') armaId: string,
    @Body() body: ArmaRequestDTO,
  ): Promise<ArmaResponseDto> {
    const dto = await ValidateSchema.validate(ArmaSchema, body);
    return this.updateArmaUseCase.execute(ocorrenciaId, armaId, dto);
  }
}
