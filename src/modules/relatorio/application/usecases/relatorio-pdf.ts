import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IRelatorioRepository } from '../../infra/repository/interfaces/IRetalorioRepository';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class GerarPdfRelatorioUseCase {
  constructor(
    @Inject('IRelatorioRepository')
    private readonly relatorioRepository: IRelatorioRepository,
  ) {}

  async execute(id: string): Promise<PDFKit.PDFDocument> {
    const relatorio = await this.relatorioRepository.findById(id);

    if (!relatorio) {
      throw new NotFoundException('Relatório não encontrado');
    }

    const doc = new PDFDocument({ margin: 50, size: 'A4' });

    doc
      .fontSize(14)
      .text('RELATÓRIO DE FISCALIZAÇÃO', { align: 'center', underline: true });
    doc.moveDown();

    doc.fontSize(10).font('Helvetica-Bold').text('INFORMAÇÕES GERAIS');
    doc.font('Helvetica').fontSize(9);
    doc.text(`OPERAÇÃO: ${relatorio.operacao.nome.toUpperCase()}`);
    doc.text(`LOCAL: ${relatorio.local.toUpperCase()}`);
    doc.text(
      `FISCAL: ${
        relatorio.fiscal.postoGraduação
      } ${relatorio.fiscal.nome.toUpperCase()}`,
    );
    doc.text(
      `PERÍODO: ${new Date(
        relatorio.dataInicial,
      ).toLocaleDateString()} A ${new Date(
        relatorio.dataFinal,
      ).toLocaleDateString()}`,
    );
    doc.moveDown();

    doc.fontSize(10).font('Helvetica-Bold').text('EFETIVO E POSTOS');
    doc.font('Helvetica').fontSize(9);
    doc.text(`TOTAL DE POSTOS: ${relatorio.totalPosto}`);
    doc.text(`EFETIVO TOTAL: ${relatorio.efetivoTotal} PMS`);
    doc.moveDown();

    if (relatorio.aspectosPositivos?.length) {
      doc.fontSize(10).font('Helvetica-Bold').text('ASPECTOS POSITIVOS');
      relatorio.aspectosPositivos.forEach((item) => {
        doc
          .font('Helvetica')
          .fontSize(9)
          .text(`• ${item.descricao.toUpperCase()}`);
      });
      doc.moveDown();
    }

    if (relatorio.melhoriasIdentificadas?.length) {
      doc.fontSize(10).font('Helvetica-Bold').text('MELHORIAS IDENTIFICADAS');
      relatorio.melhoriasIdentificadas.forEach((item) => {
        doc
          .font('Helvetica')
          .fontSize(9)
          .text(`• ${item.descricao.toUpperCase()}`);
      });
      doc.moveDown();
    }

    doc.end();
    return doc;
  }
}
