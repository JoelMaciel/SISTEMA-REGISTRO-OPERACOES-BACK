import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IRelatorioRepository } from '../../infra/repository/interfaces/IRetalorioRepository';
import { RelatorioResponseDTO } from '../dto/response/RelatorioResponseDTO';
import * as PDFDocument from 'pdfkit';
import * as path from 'path';

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

    const doc = new PDFDocument({
      size: 'A4',
      margin: 40,
      bufferPages: true,
    });

    const pathCabecalho = path.resolve(
      process.cwd(),
      'src',
      'assets',
      'image-log.png',
    );
    const pathRodape = path.resolve(
      process.cwd(),
      'src',
      'assets',
      'image_rodape.png',
    );

    const pageWidth = 595.28;
    const pageHeight = 841.89;

    doc.moveDown(6);

    doc
      .font('Helvetica-Bold')
      .fontSize(14)
      .text('RELATÓRIO DE FISCALIZAÇÃO OPERACIONAL', { align: 'center' });
    doc.moveDown(1.5);

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

    relatorio.ocorrencias.forEach((oc, index) => {
      if (doc.y > 650) {
        doc.addPage();
        doc.moveDown(6);
      }

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
          `LOCAL: ${oc.endereco.rua?.toUpperCase()}, ${
            oc.endereco.numero || 'S/N'
          } - ${oc.endereco.bairro?.toUpperCase()} | ${oc.endereco.cidade?.toUpperCase()}-${
            oc.endereco.uf
          }`,
        );
      }
      doc.moveDown(0.3);

      doc.font('Helvetica-Bold').text('RESUMO DO FATO:');
      doc.font('Helvetica').text(oc.resumo.toUpperCase(), { align: 'justify' });
      doc.moveDown(0.8);
      doc
        .moveTo(40, doc.y)
        .lineTo(555, doc.y)
        .strokeColor('#E2E8F0')
        .lineWidth(0.5)
        .stroke();
      doc.moveDown();
    });

    if (relatorio.aspectosPositivos?.length > 0) {
      this.drawSectionHeader(doc, '3. ASPECTOS POSITIVOS');
      relatorio.aspectosPositivos.forEach((ap) =>
        doc
          .font('Helvetica')
          .fontSize(9)
          .text(`• ${ap.descricao.toUpperCase()}`),
      );
      doc.moveDown();
    }

    if (relatorio.melhoriasIdentificadas?.length > 0) {
      this.drawSectionHeader(doc, '4. MELHORIAS IDENTIFICADAS');
      relatorio.melhoriasIdentificadas.forEach((mi) =>
        doc
          .font('Helvetica')
          .fontSize(9)
          .text(`• ${mi.descricao.toUpperCase()}`),
      );
      doc.moveDown();
    }

    if (relatorio.alteracoesEfetivo?.length > 0) {
      this.drawSectionHeader(doc, '5. ALTERAÇÕES DE EFETIVO');
      relatorio.alteracoesEfetivo.forEach((ae) =>
        doc
          .font('Helvetica')
          .fontSize(9)
          .text(`• ${ae.descricao.toUpperCase()}`),
      );
      doc.moveDown();
    }

    if (relatorio.outrasAlteracoes?.length > 0) {
      this.drawSectionHeader(doc, '6. OUTRAS ALTERAÇÕES');
      relatorio.outrasAlteracoes.forEach((oa) =>
        doc
          .font('Helvetica')
          .fontSize(9)
          .text(`• ${oa.descricao.toUpperCase()}`),
      );
      doc.moveDown();
    }

    const range = doc.bufferedPageRange();
    const logoWidth = 280;
    const xPosCabecalho = (pageWidth - logoWidth) / 2;
    const footerHeight = 45;

    for (let i = range.start; i < range.start + range.count; i++) {
      doc.switchToPage(i);

      doc.image(pathCabecalho, xPosCabecalho, 15, { width: logoWidth });

      doc.image(pathRodape, 0, pageHeight - footerHeight, {
        width: pageWidth,
        height: footerHeight,
      });

      doc
        .fontSize(7)
        .fillColor('#999')
        .text(
          `Página ${i + 1} de ${range.count}`,
          0,
          pageHeight - footerHeight - 12,
          { align: 'center' },
        );
    }

    doc.end();
    return doc;
  }

  private drawSectionHeader(doc: PDFKit.PDFDocument, text: string) {
    if (doc.y > 700) {
      doc.addPage();
      doc.moveDown(6);
    }
    const y = doc.y;
    doc.rect(40, y, 515, 15).fill('#EDF2F7');
    doc
      .fillColor('#2D3748')
      .font('Helvetica-Bold')
      .fontSize(10)
      .text(text, 45, y + 3);
    doc.moveDown();
  }
}
