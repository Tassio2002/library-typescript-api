import { MigrationInterface, QueryRunner } from "typeorm";

export class default1677595664765 implements MigrationInterface {
    name = 'default1677595664765'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reserve" ("id" SERIAL NOT NULL, "date_reserve" TIMESTAMP WITH TIME ZONE NOT NULL, "date_devolution" TIMESTAMP WITH TIME ZONE, "book_id" integer, CONSTRAINT "REL_2e45590f16afd6adfd9644f12b" UNIQUE ("book_id"), CONSTRAINT "PK_619d1e12dbedbe126620cac8240" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reserve" ADD CONSTRAINT "FK_2e45590f16afd6adfd9644f12bf" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reserve" DROP CONSTRAINT "FK_2e45590f16afd6adfd9644f12bf"`);
        await queryRunner.query(`DROP TABLE "reserve"`);
    }

}
