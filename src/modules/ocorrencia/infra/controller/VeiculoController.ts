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
  VeiculoRequestDTO,
  VeiculoSchema,
} from '../../application/dto/schema/CreateOcorrenciaSchema';
import { AddVeiculoToOcorrenciaUseCase } from '../../application/usecase/veiculo/add-veiculo';
import { VeiculoResponseDTO } from '../../application/dto/response/VeiculoResponseDTO';
import { DeleteVeiculoFromOcorrenciaUseCase } from '../../application/usecase/veiculo/delete-veiculo';
import { UpdateVeiculoUseCase } from '../../application/usecase/veiculo/update-veiculo';

@Controller('api/ocorrencias')
export class VeiculoController {
  constructor(
    private readonly updateVeiculoUseCase: UpdateVeiculoUseCase,
    private readonly addVeiculoUseCase: AddVeiculoToOcorrenciaUseCase,
    private readonly deleteVeiculoUseCase: DeleteVeiculoFromOcorrenciaUseCase,
  ) {}

  @Post(':ocorrenciaId/veiculos')
  @HttpCode(HttpStatus.CREATED)
  async addVeiculo(
    @Param('ocorrenciaId') ocorrenciaId: string,
    @Body() body: VeiculoRequestDTO,
  ): Promise<VeiculoResponseDTO> {
    const dto = await ValidateSchema.validate(VeiculoSchema, body);
    return this.addVeiculoUseCase.execute(ocorrenciaId, dto);
  }

  @Patch(':ocorrenciaId/veiculos/:veiculoId')
  @HttpCode(HttpStatus.OK)
  async updateVeiculo(
    @Param('ocorrenciaId') ocorrenciaId: string,
    @Param('veiculoId') veiculoId: string,
    @Body() body: VeiculoRequestDTO,
  ): Promise<VeiculoResponseDTO> {
    const dto = await ValidateSchema.validate(VeiculoSchema, body);
    return this.updateVeiculoUseCase.execute(ocorrenciaId, veiculoId, dto);
  }

  @Delete(':ocorrenciaId/veiculos/:veiculoId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteVeiculo(
    @Param('ocorrenciaId') ocorrenciaId: string,
    @Param('veiculoId') veiculoId: string,
  ): Promise<void> {
    await this.deleteVeiculoUseCase.execute(ocorrenciaId, veiculoId);
  }
}
