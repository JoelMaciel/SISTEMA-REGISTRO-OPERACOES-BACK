// // src/modules/relatorio/application/use-cases/CreateRelatorioUseCase.ts

// import { Inject, Injectable } from '@nestjs/common';
// import { IOperacaoRepository } from 'src/modules/operacao/infra/repository/interfaces/IOperacaoRepository';
// import { IRelatorioRepository } from 'src/modules/relatorio/infra/repository/interfaces/IRetalorioRepository';

// @Injectable()
// export class CreateRelatorioUseCase {
//   constructor(
//     @Inject('IRelatorioRepository')
//     private readonly relatorioRepository: IRelatorioRepository,

//     @Inject('IOperacaoRepository')
//     private readonly operacaoRepository: IOperacaoRepository,

//     @Inject('IFiscalRepository') // Presumindo que você terá um FiscalRepository
//     private readonly fiscalRepository: IFiscalRepository,
//   ) {}

//   async execute(dto: RelatorioRequestDTO): Promise<RelatorioResponseDTO> {
//     // 1. Busca das chaves estrangeiras (FKs)
//     const operacaoPromise = this.operacaoRepository.findById(dto.operacaoId);
//     const fiscalPromise = this.fiscalRepository.findById(dto.fiscalId);

//     const [operacao, fiscal] = await Promise.all([
//       operacaoPromise,
//       fiscalPromise,
//     ]);

//     if (!operacao) {
//       throw new Error(`Operação com ID ${dto.operacaoId} não encontrada.`);
//     }
//     if (!fiscal) {
//       throw new Error(`Fiscal com ID ${dto.fiscalId} não encontrado.`);
//     }

//     // 2. Mapeamento do DTO para a Entidade
//     const relatorioEntity = this.mapToEntity(dto);
//     relatorioEntity.operacao = operacao;
//     relatorioEntity.fiscal = fiscal;

//     // 3. Salvamento (o cascade: true cuidará dos filhos)
//     const novoRelatorio = await this.relatorioRepository.create(
//       relatorioEntity,
//     );

//     // 4. Retorno
//     return new RelatorioResponseDTO(novoRelatorio);
//   }

//   private mapToEntity(dto: RelatorioRequestDTO): Relatorio {
//     const relatorio = new Relatorio();

//     // Colunas primárias
//     relatorio.dataInicial = new Date(dto.dataInicial);
//     relatorio.dataFinal = new Date(dto.dataFinal);
//     relatorio.horarioInicial = dto.horarioInicial;
//     relatorio.horarioFinal = dto.horarioFinal;
//     relatorio.local = dto.local;
//     relatorio.totalPosto = dto.totalPosto;
//     relatorio.efetivoTotal = dto.efetivoTotal;

//     // Entidades filhas (One-to-Many)
//     relatorio.aspectosPositivos = (dto.aspectosPositivos || []).map((a) =>
//       this.mapAspectoPositivo(a),
//     );

//     relatorio.melhoriasIdentificadas = (dto.melhoriasIdentificadas || []).map(
//       (m) => this.mapMelhoriaIdentificada(m),
//     );

//     relatorio.alteracoesEfetivo = (dto.alteracoesEfetivo || []).map((ae) =>
//       this.mapAlteracaoEfetivo(ae),
//     );

//     relatorio.outrasAlteracoes = (dto.outrasAlteracoes || []).map((oa) =>
//       this.mapOutraAlteracao(oa),
//     );

//     return relatorio;
//   }

//   // --- Mapeadores de Filhos ---

//   private mapAspectoPositivo(dto: AspectoPositivoRequestDTO): AspectoPositivo {
//     const aspecto = new AspectoPositivo();
//     aspecto.descricao = dto.descricao;
//     return aspecto;
//   }

//   private mapMelhoriaIdentificada(
//     dto: MelhoriaIdentificadaRequestDTO,
//   ): MelhoriaIdentificada {
//     const melhoria = new MelhoriaIdentificada();
//     melhoria.descricao = dto.descricao;
//     return melhoria;
//   }

//   private mapAlteracaoEfetivo(
//     dto: AlteracaoEfetivoRequestDTO,
//   ): AlteracaoEfetivo {
//     const alteracao = new AlteracaoEfetivo();
//     alteracao.status = dto.status;
//     alteracao.descricao = dto.descricao;
//     return alteracao;
//   }

//   private mapOutraAlteracao(dto: OutraAlteracaoRequestDTO): OutraAlteracao {
//     const alteracao = new OutraAlteracao();
//     alteracao.descricao = dto.descricao;
//     return alteracao;
//   }
// }
