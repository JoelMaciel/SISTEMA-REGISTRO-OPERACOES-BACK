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
  MunicaoRequestDTO,
  MunicaoSchema,
} from '../../application/dto/schema/CreateOcorrenciaSchema';
import { AddMunicaoToOcorrenciaUseCase } from '../../application/usecase/municao/add-municao';
import { MunicaoResponseDTO } from '../../application/dto/response/MunicaoResponseDTO';
import { DeleteMunicaoFromOcorrenciaUseCase } from '../../application/usecase/municao/delete-municao';
import { UpdateMunicaoUseCase } from '../../application/usecase/municao/update-municao';

@Controller('api/ocorrencias')
export class MunicaoController {
  constructor(
    private readonly updateMunicaoUseCase: UpdateMunicaoUseCase,
    private readonly addMunicaoUseCase: AddMunicaoToOcorrenciaUseCase,
    private readonly deleteMunicaoUseCase: DeleteMunicaoFromOcorrenciaUseCase,
  ) {}

  @Post(':ocorrenciaId/municoes')
  @HttpCode(HttpStatus.CREATED)
  async addMunicao(
    @Param('ocorrenciaId') ocorrenciaId: string,
    @Body() body: MunicaoRequestDTO,
  ): Promise<MunicaoResponseDTO> {
    const dto = await ValidateSchema.validate(MunicaoSchema, body);
    return this.addMunicaoUseCase.execute(ocorrenciaId, dto);
  }

  @Patch(':ocorrenciaId/municoes/:municaoId')
  @HttpCode(HttpStatus.OK)
  async updateMunicao(
    @Param('ocorrenciaId') ocorrenciaId: string,
    @Param('municaoId') municaoId: string,
    @Body() body: MunicaoRequestDTO,
  ): Promise<MunicaoResponseDTO> {
    const dto = await ValidateSchema.validate(MunicaoSchema, body);
    return this.updateMunicaoUseCase.execute(ocorrenciaId, municaoId, dto);
  }

  @Delete(':ocorrenciaId/municoes/:municaoId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMunicao(
    @Param('ocorrenciaId') ocorrenciaId: string,
    @Param('municaoId') municaoId: string,
  ): Promise<void> {
    await this.deleteMunicaoUseCase.execute(ocorrenciaId, municaoId);
  }
}
