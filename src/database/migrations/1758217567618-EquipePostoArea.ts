import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class EquipePostoArea1758217567618 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'equipe_posto_area',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'equipe_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'posto_area_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'criado_em',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'equipe_posto_area',
      new TableForeignKey({
        columnNames: ['equipe_id'],
        referencedTableName: 'equipe',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'equipe_posto_area',
      new TableForeignKey({
        columnNames: ['posto_area_id'],
        referencedTableName: 'posto_area',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('equipe_posto_area');
  }
}
