import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { OcorrenciaResponseDTO } from '../../application/dto/response/OcorrenciaResponseDTO';
import { ValidateSchema } from 'src/shared/validation/ValidationSchema';
import { CreateOcorrenciaUseCase } from '../../application/usecase/ocorrencia/create-ocorrencia';
import { CreateOperacaoRequestDTO } from 'src/modules/operacao/application/dto/schema/CreateOperacaoSchema';
import { OcorrenciaSchema } from '../../application/dto/schema/CreateOcorrenciaSchema';

@Controller('api/ocorrencias')
export class OcorrenciaController {
  constructor(
    private readonly createOcorrenciaUseCase: CreateOcorrenciaUseCase,
  ) {}

  @Post(':operacaoId')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param('operacaoId') operacaoId: string,
    @Body() body: CreateOperacaoRequestDTO,
  ): Promise<OcorrenciaResponseDTO> {
    const dto = await ValidateSchema.validate(OcorrenciaSchema, body);
    return this.createOcorrenciaUseCase.execute(operacaoId, dto);
  }
}
