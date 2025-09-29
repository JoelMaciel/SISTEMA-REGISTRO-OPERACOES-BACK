import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateEquipeOperacaoTable1752503731181
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'operacoes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'nome', type: 'varchar', length: '70', isNullable: false },
          {
            name: 'opm_demandante',
            type: 'varchar',
            length: '30',
            isNullable: false,
          },
          { name: 'data_inicial', type: 'date' },
          { name: 'data_final', type: 'date' },
          { name: 'efetivo_policial', type: 'int' },
          { name: 'quantidade_posto_area', type: 'int' },
          { name: 'observacoes', type: 'text' },
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

    await queryRunner.createTable(
      new Table({
        name: 'postos_areas',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'nome', type: 'varchar', length: '120', isNullable: false },
          { name: 'local', type: 'varchar', length: '120', isNullable: false },
          { name: 'numero', type: 'varchar', length: '30', isNullable: true },
          { name: 'bairro', type: 'varchar', length: '120', isNullable: true },
          { name: 'cidade', type: 'varchar', length: '120' },
          { name: 'quantidade', type: 'int', isNullable: false },
          {
            name: 'operacao_id',
            type: 'uuid',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'postos_areas',
      new TableForeignKey({
        columnNames: ['operacao_id'],
        referencedTableName: 'operacoes',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'equipes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'email', type: 'varchar', length: '60', isNullable: false },
          {
            name: 'contato_equipe',
            type: 'varchar',
            length: '12',
            isNullable: false,
          },
          { name: 'data_operacao', type: 'date' },
          { name: 'horario_inicial', type: 'varchar' },
          { name: 'horario_final', type: 'varchar' },
          { name: 'nome_operacao', type: 'varchar', isNullable: false },
          { name: 'posto_comandante', type: 'varchar', isNullable: false },
          {
            name: 'nome_guerra_comandante',
            type: 'varchar',
            length: '60',
            isNullable: false,
          },
          {
            name: 'matricula_comandante',
            type: 'varchar',
            length: '12',
            isNullable: false,
          },
          {
            name: 'opm_guarnicao',
            type: 'varchar',
            length: '30',
            isNullable: false,
          },
          {
            name: 'prefixo_vtr',
            type: 'varchar',
            length: '20',
            isNullable: false,
          },
          { name: 'efetivo_policial', type: 'int' },
          {
            name: 'logradouro',
            type: 'varchar',
            length: '200',
            isNullable: false,
          },
          { name: 'tipo_servico', type: 'varchar', isNullable: false },
          {
            name: 'numero_ht',
            type: 'varchar',
            length: '30',
            isNullable: false,
          },
          {
            name: 'posto_area_id',
            type: 'uuid',
            isNullable: true,
          },
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
      'equipes',
      new TableForeignKey({
        columnNames: ['posto_area_id'],
        referencedTableName: 'postos_areas',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('equipes');
    await queryRunner.dropTable('postos_areas');
    await queryRunner.dropTable('operacoes');
  }
}
