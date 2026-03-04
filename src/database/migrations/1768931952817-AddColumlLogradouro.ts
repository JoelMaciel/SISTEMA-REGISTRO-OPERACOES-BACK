import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumlLogradouro1768931952817 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'postos_areas',
      new TableColumn({
        name: 'logradouro',
        type: 'varchar',
        length: '200',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('postos_areas', 'logradouro');
  }
}
