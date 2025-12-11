import { Acusado } from 'src/modules/ocorrencia/domain/entities/acusado';
import { Arma } from 'src/modules/ocorrencia/domain/entities/arma';
import { Dinheiro } from 'src/modules/ocorrencia/domain/entities/dinheiro';
import { Droga } from 'src/modules/ocorrencia/domain/entities/droga';
import { Endereco } from 'src/modules/ocorrencia/domain/entities/Endereco';
import { Municao } from 'src/modules/ocorrencia/domain/entities/municao';
import { Ocorrencia } from 'src/modules/ocorrencia/domain/entities/ocorrencia';
import { OutroObjeto } from 'src/modules/ocorrencia/domain/entities/outroObjeto';
import { Veiculo } from 'src/modules/ocorrencia/domain/entities/veiculo';
import { Vitima } from 'src/modules/ocorrencia/domain/entities/vitima';

export interface IPaginatedResult<T> {
  items: T[];
  total: number;
  pageIndex: number;
  pageSize: number;
}

export interface IOcorrenciaRepository {
  create(data: Partial<Ocorrencia>): Promise<Ocorrencia>;

  save(ocorrencia: Ocorrencia): Promise<Ocorrencia>;
  saveArma(arma: Arma): Promise<Arma>;
  saveEndereco(endereco: Endereco): Promise<Endereco>;
  saveVitima(vitima: Vitima): Promise<Vitima>;
  saveAcusado(acusado: Acusado): Promise<Acusado>;
  saveOutroObjeto(outroObjeto: OutroObjeto): Promise<OutroObjeto>;
  saveDinheiro(dinheiro: Dinheiro): Promise<Dinheiro>;
  saveVeiculo(veiculo: Veiculo): Promise<Veiculo>;
  saveMunicao(municao: Municao): Promise<Municao>;
  saveDroga(droga: Droga): Promise<Droga>;

  findById(id: string, relations?: string[]): Promise<Ocorrencia | null>;

  findByMOcorrencia(m: string): Promise<Ocorrencia | null>;

  findOcorrenciaWithVitima(
    ocorrenciaId: string,
    vitimaId: string,
  ): Promise<{ ocorrencia: Ocorrencia; vitima: Vitima } | null>;

  findOcorrenciaWithOutroObjeto(
    ocorrenciaId: string,
    outroObjetoId: string,
  ): Promise<{ ocorrencia: Ocorrencia; outroObjeto: OutroObjeto } | null>;

  findOcorrenciaWithAcusado(
    ocorrenciaId: string,
    acusadoId: string,
  ): Promise<{ ocorrencia: Ocorrencia; acusado: Acusado } | null>;

  findOcorrenciaWithArma(
    ocorrenciaId: string,
    armaId: string,
  ): Promise<{ ocorrencia: Ocorrencia; arma: Arma } | null>;

  findOcorrenciaWithDinheiro(
    ocorrenciaId: string,
    dinheiroId: string,
  ): Promise<{ ocorrencia: Ocorrencia; dinheiro: Dinheiro } | null>;

  findOcorrenciaWithMunicao(
    ocorrenciaId: string,
    municaoId: string,
  ): Promise<{ ocorrencia: Ocorrencia; municao: Municao } | null>;

  findOcorrenciaWithVeiculo(
    ocorrenciaId: string,
    veiculoId: string,
  ): Promise<{ ocorrencia: Ocorrencia; veiculo: Veiculo } | null>;

  findOcorrenciaWithDroga(
    ocorrenciaId: string,
    drogaId: string,
  ): Promise<{ ocorrencia: Ocorrencia; droga: Droga } | null>;

  findAll(
    page: number,
    limit: number,
    m?: string,
    tipo?: string,
    dataInicio?: Date,
    dataFim?: Date,
    nomeVitima?: string,
    nomeAcusado?: string,
    tipoArma?: string,
    calibreArma?: string,
    numeracaoArma?: string,
  ): Promise<IPaginatedResult<Ocorrencia>>;

  update(id: string, data: Partial<Ocorrencia>): Promise<Ocorrencia>;
  delete(id: string): Promise<void>;
}
