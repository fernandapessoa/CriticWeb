import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableMovie1715366147291 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "movie",
        columns: [
          {
            name: "movie_id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "title",
            type: "varchar",
          },
          {
            name: "category",
            type: "varchar",
          },
          {
            name: "image",
            type: "varchar",
          },
          {
            name: "description",
            type: "text",
          },
          {
            name: "year",
            type: "int",
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("movie");
  }
}
