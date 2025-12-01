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

@Controller('api/ocorrencias')
export class MunicaoController {
  constructor(
    // private readonly updateArmaUseCase: UpdateArmaUseCase,
    private readonly addMunicaoUseCase: AddMunicaoToOcorrenciaUseCase, // private readonly deleteArmaFromOcorrenciaUseCase: DeleteArmaFromOcorrenciaUseCase,
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

  // @Delete(':ocorrenciaId/armas/:armaId')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // async deleteArma(
  //   @Param('ocorrenciaId') ocorrenciaId: string,
  //   @Param('armaId') armaId: string,
  // ): Promise<void> {
  //   await this.deleteArmaFromOcorrenciaUseCase.execute(ocorrenciaId, armaId);
  // }
}
