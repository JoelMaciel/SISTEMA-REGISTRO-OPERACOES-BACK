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
  ArmaSchema,
  DrogaRequestDTO,
} from '../../application/dto/schema/CreateOcorrenciaSchema';
import { AddDrogaToOcorrenciaUseCase } from '../../application/usecase/droga/add-droga';
import { DrogaResponseDTO } from '../../application/dto/response/DrogaResponseDTO';
import { DrogaSchema } from '../../application/dto/schema/UpdateOcorrenciaSchema';
import { DeleteDrogaFromOcorrenciaUseCase } from '../../application/usecase/droga/delete-droga';

@Controller('api/ocorrencias')
export class DrogaController {
  constructor(
    // private readonly updateArmaUseCase: UpdateArmaUseCase,
    private readonly addDrogaUseCase: AddDrogaToOcorrenciaUseCase,
    private readonly deleteDrogaFromOcorrenciaUseCase: DeleteDrogaFromOcorrenciaUseCase,
  ) {}

  @Post(':ocorrenciaId/drogas')
  @HttpCode(HttpStatus.CREATED)
  async addArma(
    @Param('ocorrenciaId') ocorrenciaId: string,
    @Body() body: DrogaRequestDTO,
  ): Promise<DrogaResponseDTO> {
    const dto = await ValidateSchema.validate(DrogaSchema, body);
    return this.addDrogaUseCase.execute(ocorrenciaId, dto);
  }

  // @Patch(':ocorrenciaId/armas/:armaId')
  // @HttpCode(HttpStatus.OK)
  // async updateArma(
  //   @Param('ocorrenciaId') ocorrenciaId: string,
  //   @Param('armaId') armaId: string,
  //   @Body() body: ArmaRequestDTO,
  // ): Promise<ArmaResponseDTO> {
  //   const dto = await ValidateSchema.validate(ArmaSchema, body);
  //   return this.updateArmaUseCase.execute(ocorrenciaId, armaId, dto);
  // }

  @Delete(':ocorrenciaId/drogas/:drogaId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArma(
    @Param('ocorrenciaId') ocorrenciaId: string,
    @Param('drogaId') drograId: string,
  ): Promise<void> {
    await this.deleteDrogaFromOcorrenciaUseCase.execute(ocorrenciaId, drograId);
  }
}
