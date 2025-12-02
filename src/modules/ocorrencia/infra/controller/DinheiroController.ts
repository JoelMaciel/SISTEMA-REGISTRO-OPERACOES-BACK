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
  DinheiroRequestDTO,
  DinheiroSchema,
} from '../../application/dto/schema/CreateOcorrenciaSchema';

import { AddDinheiroOcorrenciaUseCase } from '../../application/usecase/dinheiro/add-dinheiro';
import { DinheiroResponseDTO } from '../../application/dto/response/DinheiroResponseDTO';
import { DeleteDinheiroOcorrenciaUseCase } from '../../application/usecase/dinheiro/delete-dinheiro';

@Controller('api/ocorrencias')
export class DinheiroController {
  constructor(
    // private readonly updateArmaUseCase: UpdateArmaUseCase,
    private readonly addDinheiroUseCase: AddDinheiroOcorrenciaUseCase,
    private readonly deleteDinheiroaUseCase: DeleteDinheiroOcorrenciaUseCase,
  ) {}

  @Post(':ocorrenciaId/dinheiro')
  @HttpCode(HttpStatus.CREATED)
  async addDinheiro(
    @Param('ocorrenciaId') ocorrenciaId: string,
    @Body() body: DinheiroRequestDTO,
  ): Promise<DinheiroResponseDTO> {
    const dto = await ValidateSchema.validate(DinheiroSchema, body);
    return this.addDinheiroUseCase.execute(ocorrenciaId, dto);
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

  @Delete(':ocorrenciaId/dinheiro/:dinheiroId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArma(
    @Param('ocorrenciaId') ocorrenciaId: string,
    @Param('dinheiroId') dinheiroId: string,
  ): Promise<void> {
    await this.deleteDinheiroaUseCase.execute(ocorrenciaId, dinheiroId);
  }
}
