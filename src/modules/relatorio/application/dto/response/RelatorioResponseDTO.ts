import { Relatorio } from '../../../domain/entities/relatorio';
import { FiscalResponseDTO } from 'src/modules/fiscal/application/dto/response/FiscalResponseDTO';
import { OperacaoResponseDTO } from 'src/modules/operacao/application/dto/response/OperacaoResponseDTO';
import { AspectoPositivoResponseDTO } from './AspectoPositivoResponseDTO';
import { MelhoriaIdentificadaResponseDTO } from './MelhoriaIdentificadaResponseDTO';
import { AlteracaoEfetivoResponseDTO } from './AlteracaoEfetivoResponseDTO.ts';
import { OutraAlteracaoResponseDTO } from './OutraAlteracaoResponseDTO.ts';
import { OcorrenciaResponseDTO } from 'src/modules/ocorrencia/application/dto/response/OcorrenciaResponseDTO';
import { Ocorrencia } from 'src/modules/ocorrencia/domain/entities/ocorrencia';

export class RelatorioResponseDTO {
  id: string;
  dataInicial: Date;
  dataFinal: Date;
  horarioInicial: string;
  horarioFinal: string;
  local: string;
  totalPosto: number;
  efetivoTotal: number;
  postoAreas: any[];

  operacao: Pick<
    OperacaoResponseDTO,
    | 'id'
    | 'nome'
    | 'opmDemandante'
    | 'dataInicial'
    | 'dataFinal'
    | 'efetivoPolicial'
    | 'quantidadePostoArea'
  >;

  fiscal: Pick<
    FiscalResponseDTO,
    'id' | 'nome' | 'postoGraduacao' | 'matricula' | 'opm'
  >;

  ocorrencias: OcorrenciaResponseDTO[];

  aspectosPositivos: AspectoPositivoResponseDTO[];
  melhoriasIdentificadas: MelhoriaIdentificadaResponseDTO[];
  alteracoesEfetivo: AlteracaoEfetivoResponseDTO[];
  outrasAlteracoes: OutraAlteracaoResponseDTO[];

  constructor(entity: Relatorio, ocorrenciasEncontradas: Ocorrencia[] = []) {
    this.id = entity.id;
    this.dataInicial = entity.dataInicial;
    this.dataFinal = entity.dataFinal;
    this.horarioInicial = entity.horarioInicial;
    this.horarioFinal = entity.horarioFinal;
    this.local = entity.local;
    this.totalPosto = entity.totalPosto;
    this.efetivoTotal = entity.efetivoTotal;

    this.operacao = entity.operacao
      ? {
          id: entity.operacao.id,
          nome: entity.operacao.nome,
          opmDemandante: entity.operacao.opmDemandante,
          dataInicial: entity.operacao.dataInicial,
          dataFinal: entity.operacao.dataFinal,
          efetivoPolicial: entity.operacao.efetivoPolicial,
          quantidadePostoArea: entity.operacao.quantidadePostoArea,
        }
      : null;
    this.fiscal = entity.fiscal
      ? {
          id: entity.fiscal.id,
          nome: entity.fiscal.nome,
          postoGraduacao: entity.fiscal.postoGraduação,
          matricula: entity.fiscal.matricula,
          opm: entity.fiscal.opm,
        }
      : null;

    this.postoAreas =
      entity.operacao?.postoAreas?.map((posto) => ({
        nome: posto.nome,
        equipes: posto.equipes?.map((equipe) => ({
          comandante: `${equipe.postoComandante} ${equipe.nomeGuerraComandante}`,
          matricula: equipe.matriculaComandante,
          efetivo: equipe.efetivoPolicial,
        })),
      })) || [];

    this.ocorrencias = ocorrenciasEncontradas.map(
      (oc) => new OcorrenciaResponseDTO(oc),
    );

    this.aspectosPositivos = (entity.aspectosPositivos || []).map(
      (ap) => new AspectoPositivoResponseDTO(ap),
    );
    this.melhoriasIdentificadas = (entity.melhoriasIdentificadas || []).map(
      (mi) => new MelhoriaIdentificadaResponseDTO(mi),
    );
    this.alteracoesEfetivo = (entity.alteracoesEfetivo || []).map(
      (ae) => new AlteracaoEfetivoResponseDTO(ae),
    );
    this.outrasAlteracoes = (entity.outrasAlteracoes || []).map(
      (oa) => new OutraAlteracaoResponseDTO(oa),
    );
  }
}
