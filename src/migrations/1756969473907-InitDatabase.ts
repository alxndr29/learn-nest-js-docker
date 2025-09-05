import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1756969473907 implements MigrationInterface {
    name = 'InitDatabase1756969473907'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`image\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`image\``);
    }

}
