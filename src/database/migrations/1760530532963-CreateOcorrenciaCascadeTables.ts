import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateOcorrenciaCascadeTables1760530532963
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.createTable(
      new Table({
        name: 'enderecos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'rua', type: 'varchar', length: '80', isNullable: true },
          { name: 'numero', type: 'varchar', length: '20', isNullable: true },
          { name: 'bairro', type: 'varchar', length: '80', isNullable: true },
          { name: 'cidade', type: 'varchar', length: '100', isNullable: false },

          { name: 'cep', type: 'varchar', length: '10', isNullable: false },
          { name: 'uf', type: 'varchar', length: '2', isNullable: false },
          {
            name: 'complemento',
            type: 'varchar',
            length: '120',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'ocorrencias',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'm',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          { name: 'data', type: 'date', isNullable: false },
          {
            name: 'horario_inicial',
            type: 'varchar',
            length: '10',
            isNullable: false,
          },
          {
            name: 'tipo_ocorrencia',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          { name: 'resumo', type: 'text', isNullable: false },
          { name: 'endereco_id', type: 'uuid', isNullable: true },
          {
            name: 'criado_em',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'atualizado_em',
            type: 'timestamp',
            default: 'now()',
            onUpdate: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'ocorrencias',
      new TableForeignKey({
        columnNames: ['endereco_id'],
        referencedTableName: 'enderecos',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'vitimas',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          { name: 'nome', type: 'varchar', length: '100', isNullable: false },
          { name: 'cpf', type: 'varchar', length: '20' },
          { name: 'idade', type: 'int' },
          { name: 'data_nascimento', type: 'varchar', length: '20' },
          { name: 'nome_mae', type: 'varchar', length: '100' },
          { name: 'nome_pai', type: 'varchar', length: '100' },
          { name: 'naturalidade', type: 'varchar', length: '50' },
          { name: 'nacionalidade', type: 'varchar', length: '50' },
          { name: 'endereco_id', type: 'uuid', isNullable: true },
          { name: 'ocorrencia_id', type: 'uuid' },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKeys('vitimas', [
      new TableForeignKey({
        columnNames: ['ocorrencia_id'],
        referencedTableName: 'ocorrencias',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['endereco_id'],
        referencedTableName: 'enderecos',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    ]);

    await queryRunner.createTable(
      new Table({
        name: 'acusados',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          { name: 'nome', type: 'varchar', length: '100' },
          { name: 'idade', type: 'int' },
          { name: 'cpf', type: 'varchar', length: '14' },
          { name: 'data_nascimento', type: 'varchar', length: '10' },
          { name: 'nome_mae', type: 'varchar', length: '100' },
          { name: 'nome_pai', type: 'varchar', length: '100' },
          { name: 'naturalidade', type: 'varchar', length: '50' },
          { name: 'nacionalidade', type: 'varchar', length: '50' },
          { name: 'endereco_id', type: 'uuid', isNullable: true },
          { name: 'ocorrencia_id', type: 'uuid' },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKeys('acusados', [
      new TableForeignKey({
        columnNames: ['ocorrencia_id'],
        referencedTableName: 'ocorrencias',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['endereco_id'],
        referencedTableName: 'enderecos',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    ]);

    await queryRunner.query(`
      CREATE TYPE "unidade_medida_enum" AS ENUM ('g', 'kg', 't')
    `);

    await queryRunner.createTable(
      new Table({
        name: 'drogas',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          { name: 'tipo', type: 'varchar', length: '100', isNullable: false },
          {
            name: 'quantidade',
            type: 'varchar',
            length: '25',
            isNullable: false,
          },
          {
            name: 'unidade_medida',
            type: 'unidade_medida_enum',
            isNullable: false,
          },
          { name: 'ocorrencia_id', type: 'uuid' },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'drogas',
      new TableForeignKey({
        columnNames: ['ocorrencia_id'],
        referencedTableName: 'ocorrencias',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'municoes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'quantidade',
            type: 'varchar',
            length: '25',
            isNullable: false,
          },
          { name: 'calibre', type: 'varchar', length: '20', isNullable: false },
          { name: 'ocorrencia_id', type: 'uuid' },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'municoes',
      new TableForeignKey({
        columnNames: ['ocorrencia_id'],
        referencedTableName: 'ocorrencias',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.query(`
      CREATE TYPE "situacao_veiculo_enum" AS ENUM ('APREENDIDO', 'RECUPERADO')
    `);

    await queryRunner.createTable(
      new Table({
        name: 'veiculos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          { name: 'marca', type: 'varchar', length: '30', isNullable: false },
          { name: 'tipo', type: 'varchar', length: '25', isNullable: false },
          { name: 'placa', type: 'varchar', length: '25', isNullable: false },
          { name: 'modelo', type: 'varchar', length: '30', isNullable: false },
          { name: 'cor', type: 'varchar', length: '20', isNullable: false },
          {
            name: 'situacao',
            type: 'situacao_veiculo_enum',
            isNullable: false,
          },
          { name: 'ocorrencia_id', type: 'uuid' },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'veiculos',
      new TableForeignKey({
        columnNames: ['ocorrencia_id'],
        referencedTableName: 'ocorrencias',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'armas',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          { name: 'tipo', type: 'varchar', length: '80' },
          { name: 'calibre', type: 'varchar', length: '25' },
          { name: 'numeracao', type: 'varchar', length: '80' },
          { name: 'capacidade', type: 'int' },
          { name: 'ocorrencia_id', type: 'uuid' },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'armas',
      new TableForeignKey({
        columnNames: ['ocorrencia_id'],
        referencedTableName: 'ocorrencias',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'outros_objetos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          { name: 'descricao', type: 'text' },
          { name: 'ocorrencia_id', type: 'uuid' },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'outros_objetos',
      new TableForeignKey({
        columnNames: ['ocorrencia_id'],
        referencedTableName: 'ocorrencias',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'dinheiro',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          { name: 'valor', type: 'varchar', length: '15' },
          { name: 'ocorrencia_id', type: 'uuid' },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'dinheiro',
      new TableForeignKey({
        columnNames: ['ocorrencia_id'],
        referencedTableName: 'ocorrencias',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('dinheiro');
    await queryRunner.dropTable('outros_objetos');
    await queryRunner.dropTable('armas');
    await queryRunner.dropTable('veiculos');
    await queryRunner.dropTable('municoes');
    await queryRunner.dropTable('drogas');
    await queryRunner.dropTable('acusados');
    await queryRunner.dropTable('vitimas');
    await queryRunner.dropTable('ocorrencias');
    await queryRunner.dropTable('enderecos');

    await queryRunner.query('DROP TYPE IF EXISTS "unidade_medida_enum"');
    await queryRunner.query('DROP TYPE IF EXISTS "situacao_veiculo_enum"');
  }
}
