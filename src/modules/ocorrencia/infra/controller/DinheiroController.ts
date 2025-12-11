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
import { UpdateDinheiroUseCase } from '../../application/usecase/dinheiro/update-dinheiro';

@Controller('api/ocorrencias')
export class DinheiroController {
  constructor(
    private readonly updateDinheiroUseCase: UpdateDinheiroUseCase,
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

  @Patch(':ocorrenciaId/dinheiro/:dinheiroId')
  @HttpCode(HttpStatus.OK)
  async updateDinheiro(
    @Param('ocorrenciaId') ocorrenciaId: string,
    @Param('dinheiroId') dinheiroId: string,
    @Body() body: DinheiroRequestDTO,
  ): Promise<DinheiroResponseDTO> {
    const dto = await ValidateSchema.validate(DinheiroSchema, body);
    return this.updateDinheiroUseCase.execute(ocorrenciaId, dinheiroId, dto);
  }

  @Delete(':ocorrenciaId/dinheiro/:dinheiroId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArma(
    @Param('ocorrenciaId') ocorrenciaId: string,
    @Param('dinheiroId') dinheiroId: string,
  ): Promise<void> {
    await this.deleteDinheiroaUseCase.execute(ocorrenciaId, dinheiroId);
  }
}
