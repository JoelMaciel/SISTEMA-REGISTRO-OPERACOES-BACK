import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IRelatorioRepository } from '../../infra/repository/interfaces/IRetalorioRepository';
import { RelatorioResponseDTO } from '../dto/response/RelatorioResponseDTO';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class GerarPdfRelatorioUseCase {
  constructor(
    @Inject('IRelatorioRepository')
    private readonly relatorioRepository: IRelatorioRepository,
  ) {}

  async execute(id: string): Promise<PDFKit.PDFDocument> {
    const entity = await this.relatorioRepository.findById(id);

    if (!entity) {
      throw new NotFoundException('Relatório não encontrado');
    }

    const relatorio = new RelatorioResponseDTO(
      entity,
      entity.operacao?.ocorrencias || [],
    );

    const doc = new PDFDocument({ margin: 40, size: 'A4' });

    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('RELATÓRIO DE FISCALIZAÇÃO OPERACIONAL', { align: 'center' });
    doc.moveDown();

    this.drawSectionHeader(doc, '1. INFORMAÇÕES GERAIS');
    doc.font('Helvetica').fontSize(9).fillColor('black');
    doc.text(`OPERAÇÃO: ${relatorio.operacao?.nome?.toUpperCase()}`);
    doc.text(`LOCAL/EVENTO: ${relatorio.local?.toUpperCase()}`);
    doc.text(
      `FISCAL: ${
        relatorio.fiscal?.postoGraduacao
      } ${relatorio.fiscal?.nome?.toUpperCase()} (MAT: ${
        relatorio.fiscal?.matricula
      })`,
    );
    doc.text(
      `PERÍODO: ${new Date(relatorio.dataInicial).toLocaleDateString(
        'pt-BR',
      )} ${relatorio.horarioInicial} ATÉ ${new Date(
        relatorio.dataFinal,
      ).toLocaleDateString('pt-BR')} ${relatorio.horarioFinal}`,
    );
    doc.text(
      `EFETIVO TOTAL: ${relatorio.efetivoTotal} PMS | TOTAL DE POSTOS: ${relatorio.totalPosto}`,
    );
    doc.moveDown();

    this.drawSectionHeader(
      doc,
      `2. OCORRÊNCIAS REGISTRADAS (${relatorio.ocorrencias.length})`,
    );

    if (relatorio.ocorrencias.length > 0) {
      relatorio.ocorrencias.forEach((oc, index) => {
        doc
          .font('Helvetica-Bold')
          .fontSize(10)
          .fillColor('#1A365D')
          .text(`${index + 1}. M: ${oc.m} | TIPO: ${oc.tipo.toUpperCase()}`);

        doc
          .font('Helvetica')
          .fontSize(8)
          .fillColor('black')
          .text(
            `DATA: ${new Date(oc.data).toLocaleDateString('pt-BR')} ÀS ${
              oc.horario
            }`,
          );

        if (oc.endereco) {
          doc.text(
            `LOCAL DO FATO: ${oc.endereco.rua?.toUpperCase()}, ${
              oc.endereco.numero || 'S/N'
            } - ${oc.endereco.bairro?.toUpperCase()} | ${oc.endereco.cidade?.toUpperCase()}-${
              oc.endereco.uf
            }`,
          );
        }
        doc.moveDown(0.3);

        if (oc.vitimas.length > 0) {
          doc.font('Helvetica-Bold').text('VÍTIMAS:');
          oc.vitimas.forEach((v) => {
            doc
              .font('Helvetica')
              .text(
                `  • NOME: ${v.nome.toUpperCase()} | CPF: ${v.cpf} | IDADE: ${
                  v.idade || 'N/I'
                } | MÃE: ${v.nomeMae?.toUpperCase()}`,
              );
            if (v.endereco)
              doc.text(
                `    END: ${v.endereco.rua?.toUpperCase()}, ${
                  v.endereco.numero
                } - ${v.endereco.bairro?.toUpperCase()}`,
              );
          });
        }

        if (oc.acusados.length > 0) {
          doc.font('Helvetica-Bold').fillColor('#C53030').text('ACUSADOS:');
          oc.acusados.forEach((a) => {
            doc
              .font('Helvetica')
              .fillColor('black')
              .text(
                `  • NOME: ${a.nome.toUpperCase()} | CPF: ${a.cpf} | IDADE: ${
                  a.idade || 'N/I'
                } | PAI: ${a.nomePai?.toUpperCase()}`,
              );
            if (a.endereco)
              doc.text(
                `    END: ${a.endereco.rua?.toUpperCase()}, ${
                  a.endereco.numero
                } - ${a.endereco.bairro?.toUpperCase()}`,
              );
          });
        }

        if (oc.veiculos.length > 0) {
          doc.font('Helvetica-Bold').text('VEÍCULOS:');
          oc.veiculos.forEach((v) => {
            doc
              .font('Helvetica')
              .text(
                `  • ${v.marca.toUpperCase()} ${v.modelo.toUpperCase()} | PLACA: ${v.placa.toUpperCase()} | COR: ${v.cor.toUpperCase()} | SITUAÇÃO: ${v.situacao.toUpperCase()}`,
              );
          });
        }

        const temApreensao =
          oc.armas.length ||
          oc.drogas.length ||
          oc.municoes.length ||
          oc.valoresApreendidos.length;
        if (temApreensao) {
          doc.font('Helvetica-Bold').text('MATERIAIS APREENDIDOS:');
          oc.armas.forEach((ar) =>
            doc
              .font('Helvetica')
              .text(
                `  - ARMA: ${ar.tipo.toUpperCase()} | CALIBRE: ${
                  ar.calibre
                } | SÉRIE: ${ar.numeracao.toUpperCase()}`,
              ),
          );
          oc.municoes.forEach((mu) =>
            doc
              .font('Helvetica')
              .text(
                `  - MUNIÇÃO: ${mu.quantidade} UNID. | CALIBRE: ${mu.calibre}`,
              ),
          );
          oc.drogas.forEach((dr) =>
            doc
              .font('Helvetica')
              .text(
                `  - DROGA: ${dr.tipo.toUpperCase()} | QTD: ${dr.quantidade} ${
                  dr.unidadeMedida
                }`,
              ),
          );
          oc.valoresApreendidos.forEach((va) =>
            doc.font('Helvetica').text(`  - VALOR: R$ ${va.valor}`),
          );
        }

        doc.moveDown(0.3);
        doc.font('Helvetica-Bold').text('RESUMO DO FATO:');
        doc
          .font('Helvetica')
          .text(oc.resumo.toUpperCase(), { align: 'justify' });

        doc.moveDown(0.8);
        doc
          .moveTo(40, doc.y)
          .lineTo(555, doc.y)
          .strokeColor('#E2E8F0')
          .lineWidth(0.5)
          .stroke();
        doc.moveDown(0.8);
      });
    }

    if (relatorio.aspectosPositivos.length > 0) {
      this.drawSectionHeader(doc, '3. ASPECTOS POSITIVOS');
      relatorio.aspectosPositivos.forEach((ap) =>
        doc
          .font('Helvetica')
          .fontSize(9)
          .text(`• ${ap.descricao.toUpperCase()}`),
      );
      doc.moveDown();
    }

    if (relatorio.melhoriasIdentificadas.length > 0) {
      this.drawSectionHeader(doc, '4. MELHORIAS IDENTIFICADAS');
      relatorio.melhoriasIdentificadas.forEach((mi) =>
        doc
          .font('Helvetica')
          .fontSize(9)
          .text(`• ${mi.descricao.toUpperCase()}`),
      );
      doc.moveDown();
    }

    if (relatorio.alteracoesEfetivo.length > 0) {
      this.drawSectionHeader(doc, '5. ALTERAÇÕES DE EFETIVO');
      relatorio.alteracoesEfetivo.forEach((ae) =>
        doc
          .font('Helvetica')
          .fontSize(9)
          .text(`• ${ae.descricao.toUpperCase()}`),
      );
      doc.moveDown();
    }

    doc.end();
    return doc;
  }

  private drawSectionHeader(doc: PDFKit.PDFDocument, text: string) {
    const y = doc.y;
    doc.rect(40, y, 515, 15).fill('#EDF2F7');
    doc
      .fillColor('#2D3748')
      .font('Helvetica-Bold')
      .fontSize(10)
      .text(text, 45, y + 3);
    doc.moveDown(0.8);
  }
}
