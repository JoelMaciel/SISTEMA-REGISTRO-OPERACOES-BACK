import { Inject, Injectable } from '@nestjs/common';
import { IEquipeRepository } from '../../../infra/repository/interfaces/IEquipeRepository';
import { Equipe } from '../../../domain/entities/equipe';
import { AppError } from 'src/shared/errors/AppError';
import { EquipeResponseDTO } from '../../dto/response/EquipeResponseDTO';
import { CreateEquipeRequestDTO } from '../../dto/shemas/CreateEquipeSchema';

@Injectable()
export class UpdateEquipeUseCase {
  constructor(
    @Inject('IEquipeRepository')
    private readonly equipeRepository: IEquipeRepository,
  ) {}

  async execute(
    id: string,
    dto: CreateEquipeRequestDTO,
  ): Promise<EquipeResponseDTO> {
    const existingEquipe = await this.equipeRepository.findById(id);
    if (!existingEquipe) {
      throw new AppError('Equipe não encontrada na base de dados', 404);
    }

    const logradouro = this.montarLogradouro(dto);

    const updatedData: Partial<Equipe> = {
      email: dto.email,
      contatoEquipe: dto.contatoEquipe,
      dataOperacao: dto.dataOperacao,
      horarioInicial: dto.horarioInicial,
      horarioFinal: dto.horarioFinal,
      nomeOperacao: dto.nomeOperacao,
      postoComandante: dto.postoComandante,
      nomeGuerraComandante: dto.nomeGuerraComandante,
      matriculaComandante: dto.matriculaComandante,
      opmGuarnicao: dto.opmGuarnicao,
      prefixoVtr: dto.prefixoVtr,
      efetivoPolicial: dto.efetivoPolicial,
      logradouro,
      tipoServico: dto.tipoServico,
      numeroHt: dto.numeroHt,
    };

    const updatedEquipe = await this.equipeRepository.update(id, updatedData);
    return new EquipeResponseDTO(updatedEquipe);
  }

  private montarLogradouro(dto: CreateEquipeRequestDTO): string {
    const partes: string[] = [];

    if (dto.nomePosto) partes.push(dto.nomePosto);
    if (dto.local) partes.push(dto.local);

    let endereco = '';
    if (dto.numero) endereco += `${dto.numero}, `;
    if (dto.bairro) endereco += `${dto.bairro} - `;
    endereco += dto.cidade;

    partes.push(endereco);

    return partes.join(' - ');
  }
}
