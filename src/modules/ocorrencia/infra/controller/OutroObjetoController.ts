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
  OutroObjetoRequestDTO,
  OutroObjetoSchema,
} from '../../application/dto/schema/CreateOcorrenciaSchema';
import { AddOutroObjetoUseCase } from '../../application/usecase/outrosObjetos/add-outro-objeto';
import { OutroObjetoResponseDTO } from '../../application/dto/response/OutroObjetoResponseDTOy';
import { DeleteOutroObjetoUseCase } from '../../application/usecase/outrosObjetos/delete-outro-objetots';
import { UpdateObjetoUseCase } from '../../application/usecase/outrosObjetos/update-outro-objeto';

@Controller('api/ocorrencias')
export class OutroObjetoController {
  constructor(
    private readonly updateObjetosUseCase: UpdateObjetoUseCase,
    private readonly addObjetoUseCase: AddOutroObjetoUseCase,
    private readonly deleteOutroObjetoUseCase: DeleteOutroObjetoUseCase,
  ) {}

  @Post(':ocorrenciaId/outros-objetos')
  @HttpCode(HttpStatus.CREATED)
  async addObjetos(
    @Param('ocorrenciaId') ocorrenciaId: string,
    @Body() body: OutroObjetoRequestDTO,
  ): Promise<OutroObjetoResponseDTO> {
    const dto = await ValidateSchema.validate(OutroObjetoSchema, body);
    return this.addObjetoUseCase.execute(ocorrenciaId, dto);
  }

  @Patch(':ocorrenciaId/outros-objetos/:outroObjetoId')
  @HttpCode(HttpStatus.OK)
  async updateObjeto(
    @Param('ocorrenciaId') ocorrenciaId: string,
    @Param('outroObjetoId') outroObjetoId: string,
    @Body() body: OutroObjetoRequestDTO,
  ): Promise<OutroObjetoResponseDTO> {
    const dto = await ValidateSchema.validate(OutroObjetoSchema, body);
    return this.updateObjetosUseCase.execute(ocorrenciaId, outroObjetoId, dto);
  }

  @Delete(':ocorrenciaId/outros-objetos/:outroObjetoId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteObjeto(
    @Param('ocorrenciaId') ocorrenciaId: string,
    @Param('outroObjetoId') outroObjetoId: string,
  ): Promise<void> {
    await this.deleteOutroObjetoUseCase.execute(ocorrenciaId, outroObjetoId);
  }
}
