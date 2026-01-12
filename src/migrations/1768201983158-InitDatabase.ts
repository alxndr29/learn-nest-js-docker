import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1768201983158 implements MigrationInterface {
    name = 'InitDatabase1768201983158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article_tag" DROP CONSTRAINT "FK_602d4921b27c9a7cb6c095992b4"`);
        await queryRunner.query(`ALTER TABLE "article_tag" DROP CONSTRAINT "FK_bbbd0832bdd107597b596d63f69"`);
        await queryRunner.query(`ALTER TABLE "article_tag" ADD CONSTRAINT "FK_bbbd0832bdd107597b596d63f69" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article_tag" ADD CONSTRAINT "FK_602d4921b27c9a7cb6c095992b4" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article_tag" DROP CONSTRAINT "FK_602d4921b27c9a7cb6c095992b4"`);
        await queryRunner.query(`ALTER TABLE "article_tag" DROP CONSTRAINT "FK_bbbd0832bdd107597b596d63f69"`);
        await queryRunner.query(`ALTER TABLE "article_tag" ADD CONSTRAINT "FK_bbbd0832bdd107597b596d63f69" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article_tag" ADD CONSTRAINT "FK_602d4921b27c9a7cb6c095992b4" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
