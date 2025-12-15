import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateVariasTabela1765547688200 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'fiscais',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },

          {
            name: 'posto_graduacao',
            type: 'varchar',
            length: '30',
            isNullable: false,
          },
          { name: 'nome', type: 'varchar', length: '40', isNullable: false },
          {
            name: 'matricula',
            type: 'varchar',
            length: '40',
            isNullable: false,
          },
          { name: 'opm', type: 'varchar', length: '40', isNullable: false },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'relatorios',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'data_inicial', type: 'date', isNullable: false },
          { name: 'data_final', type: 'date', isNullable: false },
          {
            name: 'horario_inicial',
            type: 'varchar',
            length: '10',
            isNullable: false,
          },
          {
            name: 'horario_final',
            type: 'varchar',
            length: '10',
            isNullable: false,
          },

          { name: 'local', type: 'varchar', length: '60', isNullable: false },
          { name: 'total_posto', type: 'int', isNullable: false },
          { name: 'efetivo_total', type: 'int', isNullable: false },

          { name: 'operacao_id', type: 'uuid', isNullable: false },
          { name: 'fiscal_id', type: 'uuid', isNullable: false },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'aspectos-positivos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          { name: 'descricao', type: 'text', isNullable: false },
          { name: 'relatorio_id', type: 'uuid', isNullable: false },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'melhorias-identificadas',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          { name: 'descricao', type: 'text', isNullable: false },
          { name: 'relatorio_id', type: 'uuid', isNullable: false },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'outras-alteracoes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          { name: 'descricao', type: 'text', isNullable: false },
          { name: 'relatorio_id', type: 'uuid', isNullable: false },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'alteracoes-efetivo',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'status',
            type: 'varchar',
            length: '30',
            isNullable: false,
          },
          { name: 'descricao', type: 'text', isNullable: false },
          { name: 'relatorio_id', type: 'uuid', isNullable: false },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKeys('relatorios', [
      new TableForeignKey({
        columnNames: ['operacao_id'],
        referencedTableName: 'operacoes',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
      }),
      new TableForeignKey({
        columnNames: ['fiscal_id'],
        referencedTableName: 'fiscais',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
      }),
    ]);

    const relatorioChildTables = [
      'aspectos-positivos',
      'melhorias-identificadas',
      'outras-alteracoes',
      'alteracoes-efetivo',
    ];

    for (const tableName of relatorioChildTables) {
      await queryRunner.createForeignKey(
        tableName,
        new TableForeignKey({
          columnNames: ['relatorio_id'],
          referencedTableName: 'relatorios',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const relatorioChildTables = [
      'aspectos-positivos',
      'melhorias-identificadas',
      'outras-alteracoes',
      'alteracoes-efetivo',
    ];
    for (const tableName of relatorioChildTables) {
      const table = await queryRunner.getTable(tableName);
      const relatorioFK = table.foreignKeys.find((fk) =>
        fk.columnNames.includes('relatorio_id'),
      );
      if (relatorioFK) {
        await queryRunner.dropForeignKey(tableName, relatorioFK);
      }
    }

    const relatoriosTable = await queryRunner.getTable('relatorios');
    const operacaoFKRelatorio = relatoriosTable.foreignKeys.find((fk) =>
      fk.columnNames.includes('operacao_id'),
    );
    const fiscalFKRelatorio = relatoriosTable.foreignKeys.find((fk) =>
      fk.columnNames.includes('fiscal_id'),
    );

    if (operacaoFKRelatorio) {
      await queryRunner.dropForeignKey('relatorios', operacaoFKRelatorio);
    }
    if (fiscalFKRelatorio) {
      await queryRunner.dropForeignKey('relatorios', fiscalFKRelatorio);
    }

    await queryRunner.dropTable('alteracoes-efetivo');
    await queryRunner.dropTable('outras-alteracoes');
    await queryRunner.dropTable('melhorias-identificadas');
    await queryRunner.dropTable('aspectos-positivos');
    await queryRunner.dropTable('relatorios');
    await queryRunner.dropTable('fiscais');
  }
}
