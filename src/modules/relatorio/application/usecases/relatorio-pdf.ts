import { Inject, Injectable } from '@nestjs/common';
import { IRelatorioRepository } from '../../infra/repository/interfaces/IRetalorioRepository';
import { RelatorioResponseDTO } from '../dto/response/RelatorioResponseDTO';
import * as PDFDocument from 'pdfkit';
import * as path from 'path';
import { AppError } from 'src/shared/errors/AppError';

@Injectable()
export class GerarPdfRelatorioUseCase {
  constructor(
    @Inject('IRelatorioRepository')
    private readonly relatorioRepository: IRelatorioRepository,
  ) {}

  async execute(id: string): Promise<PDFKit.PDFDocument> {
    const entity = await this.relatorioRepository.findById(id);

    if (!entity) {
      throw new AppError('Relatório não encontrado', 404);
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
      } ${relatorio.fiscal?.nome?.toUpperCase()} ` +
        `(MAT: ${
          relatorio.fiscal?.matricula
        }) - OPM: ${relatorio.fiscal?.opm?.toUpperCase()}`,
    );
    doc.text(
      `PERÍODO: ${new Date(relatorio.dataInicial).toLocaleDateString(
        'pt-BR',
      )} ${relatorio.horarioInicial} ATÉ ` +
        `${new Date(relatorio.dataFinal).toLocaleDateString('pt-BR')} ${
          relatorio.horarioFinal
        }`,
    );
    doc.text(
      `EFETIVO TOTAL: ${relatorio.efetivoTotal} PMS | TOTAL DE POSTOS: ${relatorio.totalPosto}`,
    );
    doc.moveDown();

    this.drawSectionHeader(doc, '2. DETALHAMENTO DOS POSTOS E EFETIVO');

    if (relatorio.postoAreas?.length > 0) {
      relatorio.postoAreas.forEach((posto) => {
        this.checkNewPage(doc);

        doc
          .font('Helvetica-Bold')
          .fontSize(9)
          .fillColor('#2D3748')
          .text(`POSTO/ÁREA: ${posto.nome.toUpperCase()}`);

        posto.equipes?.forEach((equipe) => {
          doc
            .font('Helvetica')
            .fontSize(8)
            .fillColor('black')
            .text(
              `  • COMANDANTE: ${equipe.comandante.toUpperCase()} (MAT: ${
                equipe.matricula
              }) | EFETIVO: ${equipe.efetivo} PMS`,
            );
        });
        doc.moveDown(0.5);
      });
    } else {
      doc
        .font('Helvetica')
        .fontSize(9)
        .text('Nenhum posto ou equipe vinculada à operação.');
    }
    doc.moveDown();

    this.drawSectionHeader(
      doc,
      `2. OCORRÊNCIAS REGISTRADAS (${relatorio.ocorrencias.length})`,
    );

    relatorio.ocorrencias.forEach((oc, index) => {
      this.checkNewPage(doc);

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
          } - ` +
            `${oc.endereco.bairro?.toUpperCase()} | ${oc.endereco.cidade?.toUpperCase()}-${
              oc.endereco.uf
            }`,
        );
      }
      doc.moveDown(0.3);

      if (oc.vitimas?.length > 0) {
        doc.font('Helvetica-Bold').text('VÍTIMAS:');
        oc.vitimas.forEach((v) => {
          doc
            .font('Helvetica')
            .text(
              `  • ${v.nome?.toUpperCase()} | CPF: ${v.cpf || 'N/I'} | IDADE: ${
                v.idade || 'N/I'
              } | ` + `MÃE: ${v.nomeMae?.toUpperCase() || 'N/I'}`,
            );
        });
      }

      if (oc.acusados?.length > 0) {
        doc.font('Helvetica-Bold').fillColor('#C53030').text('ACUSADOS:');
        oc.acusados.forEach((a) => {
          doc
            .font('Helvetica')
            .fillColor('black')
            .text(
              `  • ${a.nome?.toUpperCase()} | CPF: ${a.cpf} | IDADE: ${
                a.idade || 'N/I'
              } | ` +
                `NATURAL: ${
                  a.naturalidade?.toUpperCase() || 'N/I'
                } | NACIONALIDADE: ${a.nacionalidade?.toUpperCase() || 'N/I'}`,
            );
          doc.text(
            `    PAI: ${a.nomePai?.toUpperCase() || 'N/I'} | MÃE: ${
              a.nomeMae?.toUpperCase() || 'N/I'
            }`,
          );
          if (a.endereco) {
            doc.text(
              `    END: ${a.endereco.rua?.toUpperCase()}, ${
                a.endereco.numero || 'S/N'
              } - ${a.endereco.bairro?.toUpperCase()}`,
            );
          }
        });
      }

      doc.moveDown(0.3).font('Helvetica-Bold').text('RESUMO DO FATO:');
      doc.font('Helvetica').text(oc.resumo.toUpperCase(), { align: 'justify' });

      doc
        .moveDown(0.8)
        .moveTo(40, doc.y)
        .lineTo(555, doc.y)
        .strokeColor('#E2E8F0')
        .lineWidth(0.5)
        .stroke()
        .moveDown();
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
      relatorio.alteracoesEfetivo.forEach((ae) => {
        doc
          .font('Helvetica-Bold')
          .fontSize(9)
          .text(`[${ae.status?.toUpperCase()}] `, { continued: true })
          .font('Helvetica')
          .text(ae.descricao.toUpperCase());
      });
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

    this.addOverlays(doc, pathCabecalho, pathRodape, pageWidth, pageHeight);

    doc.end();
    return doc;
  }

  private drawSectionHeader(doc: PDFKit.PDFDocument, text: string) {
    this.checkNewPage(doc, 700);
    const y = doc.y;
    doc.rect(40, y, 515, 15).fill('#EDF2F7');
    doc
      .fillColor('#2D3748')
      .font('Helvetica-Bold')
      .fontSize(10)
      .text(text, 45, y + 3);
    doc.moveDown();
  }

  private checkNewPage(doc: PDFKit.PDFDocument, limit = 650) {
    if (doc.y > limit) {
      doc.addPage();
      doc.moveDown(6);
    }
  }

  private addOverlays(
    doc: PDFKit.PDFDocument,
    pathCabecalho: string,
    pathRodape: string,
    pageWidth: number,
    pageHeight: number,
  ) {
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
  }
}
