import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateOperacaoTable1753985447877 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'posto_servico',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'nome',
            type: 'varchar',
            length: '120',
            isNullable: false,
          },
          {
            name: 'local',
            type: 'varchar',
            length: '120',
            isNullable: false,
          },
          {
            name: 'quantidade',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'area_atuacao',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'nome',
            type: 'varchar',
            length: '120',
            isNullable: false,
          },
          {
            name: 'local',
            type: 'varchar',
            length: '120',
            isNullable: false,
          },
          {
            name: 'quantidade',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'operacao',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'nome',
            type: 'varchar',
            length: '70',
            isNullable: false,
          },
          {
            name: 'opm_demandante',
            type: 'varchar',
            length: '30',
            isNullable: false,
          },
          {
            name: 'data_inicial',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'data_final',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'efetivo_policial',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'quantidade_posto_area',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'observacoes',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'criado_em',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'operacao_posto_servico',
        columns: [
          {
            name: 'operacao_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'posto_servico_id',
            type: 'uuid',
            isPrimary: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'operacao_posto_servico',
      new TableForeignKey({
        columnNames: ['operacao_id'],
        referencedTableName: 'operacao',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'operacao_posto_servico',
      new TableForeignKey({
        columnNames: ['posto_servico_id'],
        referencedTableName: 'posto_servico',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'operacao_area_atuacao',
        columns: [
          {
            name: 'operacao_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'area_atuacao_id',
            type: 'uuid',
            isPrimary: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'operacao_area_atuacao',
      new TableForeignKey({
        columnNames: ['operacao_id'],
        referencedTableName: 'operacao',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'operacao_area_atuacao',
      new TableForeignKey({
        columnNames: ['area_atuacao_id'],
        referencedTableName: 'area_atuacao',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('operacao_area_atuacao');
    await queryRunner.dropTable('operacao_posto_servico');
    await queryRunner.dropTable('operacao');
  }
}
