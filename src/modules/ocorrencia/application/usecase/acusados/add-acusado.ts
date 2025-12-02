import { Inject, Injectable } from '@nestjs/common';
import { IOcorrenciaRepository } from 'src/modules/ocorrencia/infra/repository/interfaces/IOcorrenciaRepository';
import { AcusadoRequestDTO } from '../../dto/schema/CreateOcorrenciaSchema';
import { AppError } from 'src/shared/errors/AppError';
import { Endereco } from 'src/modules/ocorrencia/domain/entities/Endereco';
import { Acusado } from 'src/modules/ocorrencia/domain/entities/acusado';
import { AcusadoResponseDTO } from '../../dto/response/AcusadoResponseDTO';

@Injectable()
export class AddAcusadoUseCase {
  constructor(
    @Inject('IOcorrenciaRepository')
    private readonly ocorrenciaRepository: IOcorrenciaRepository,
  ) {}

  async execute(
    ocorrenciaId: string,
    dto: AcusadoRequestDTO,
  ): Promise<AcusadoResponseDTO> {
    const ocorrencia = await this.ocorrenciaRepository.findById(ocorrenciaId);

    if (!ocorrencia) {
      throw new AppError(`Ocorrência ${ocorrenciaId} não encontrada.`, 404);
    }

    const novoEndereco = new Endereco();
    novoEndereco.rua = dto.endereco.rua;
    novoEndereco.numero = dto.endereco.numero || null;
    novoEndereco.bairro = dto.endereco.bairro;
    novoEndereco.cidade = dto.endereco.cidade;
    novoEndereco.cep = dto.endereco.cep;
    novoEndereco.uf = dto.endereco.uf;
    novoEndereco.complemento = dto.endereco.complemento || null;

    const enderecoSalvo = await this.ocorrenciaRepository.saveEndereco(
      novoEndereco,
    );

    const novaAcusado = new Acusado();

    novaAcusado.nome = dto.nome;
    novaAcusado.cpf = dto.cpf;
    novaAcusado.idade = dto.idade;
    novaAcusado.dataNascimento = dto.dataNascimento;
    novaAcusado.nomePai = dto.nomePai;
    novaAcusado.nomeMae = dto.nomeMae;
    novaAcusado.naturalidade = dto.naturalidade;
    novaAcusado.nacionalidade = dto.nacionalidade;

    novaAcusado.endereco = enderecoSalvo;

    novaAcusado.ocorrencia = ocorrencia;

    const acusadoSalvo = await this.ocorrenciaRepository.saveAcusado(
      novaAcusado,
    );

    return new AcusadoResponseDTO(acusadoSalvo);
  }
}
