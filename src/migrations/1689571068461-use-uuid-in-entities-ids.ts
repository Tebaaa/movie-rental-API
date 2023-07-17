import { MigrationInterface, QueryRunner } from 'typeorm';

export class UseUuidInEntitiesIds1689571068461 implements MigrationInterface {
  name = 'UseUuidInEntitiesIds1689571068461';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tag_movies_movie" DROP CONSTRAINT "FK_04f1de63d2f065fd44d1a258bd0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_tags_tag" DROP CONSTRAINT "FK_84841214027ea2bda39392e847d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag" DROP CONSTRAINT "PK_8e4052373c579afc1471f526760"`,
    );
    await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "tag" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag" ADD CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "record" DROP CONSTRAINT "FK_e7aa825cfdbab064be4fbedb085"`,
    );
    await queryRunner.query(
      `ALTER TABLE "record" DROP CONSTRAINT "PK_192cc759287d532dab9b2896f0c"`,
    );
    await queryRunner.query(`ALTER TABLE "record" DROP COLUMN "record_id"`);
    await queryRunner.query(
      `ALTER TABLE "record" ADD "record_id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "record" ADD CONSTRAINT "PK_192cc759287d532dab9b2896f0c" PRIMARY KEY ("record_id")`,
    );
    await queryRunner.query(`ALTER TABLE "record" DROP COLUMN "movie_id"`);
    await queryRunner.query(
      `ALTER TABLE "record" ADD "movie_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_movies_movie" DROP CONSTRAINT "FK_7dca074e4371db3dee0bd68735b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_tags_tag" DROP CONSTRAINT "FK_62b97c8251a91e7943e00fa5964"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie" DROP CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422"`,
    );
    await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "movie" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie" ADD CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_movies_movie" DROP CONSTRAINT "PK_a5292f8c52f244ea420c34cfa10"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_movies_movie" ADD CONSTRAINT "PK_7dca074e4371db3dee0bd68735b" PRIMARY KEY ("movie_id")`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_04f1de63d2f065fd44d1a258bd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_movies_movie" DROP COLUMN "tag_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_movies_movie" ADD "tag_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_movies_movie" DROP CONSTRAINT "PK_7dca074e4371db3dee0bd68735b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_movies_movie" ADD CONSTRAINT "PK_a5292f8c52f244ea420c34cfa10" PRIMARY KEY ("movie_id", "tag_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_movies_movie" DROP CONSTRAINT "PK_a5292f8c52f244ea420c34cfa10"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_movies_movie" ADD CONSTRAINT "PK_04f1de63d2f065fd44d1a258bd0" PRIMARY KEY ("tag_id")`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7dca074e4371db3dee0bd68735"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_movies_movie" DROP COLUMN "movie_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_movies_movie" ADD "movie_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_movies_movie" DROP CONSTRAINT "PK_04f1de63d2f065fd44d1a258bd0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_movies_movie" ADD CONSTRAINT "PK_a5292f8c52f244ea420c34cfa10" PRIMARY KEY ("tag_id", "movie_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_tags_tag" DROP CONSTRAINT "PK_bfa965ba5983753d13f538eb02b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_tags_tag" ADD CONSTRAINT "PK_84841214027ea2bda39392e847d" PRIMARY KEY ("tag_id")`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_62b97c8251a91e7943e00fa596"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_tags_tag" DROP COLUMN "movie_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_tags_tag" ADD "movie_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_tags_tag" DROP CONSTRAINT "PK_84841214027ea2bda39392e847d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_tags_tag" ADD CONSTRAINT "PK_bfa965ba5983753d13f538eb02b" PRIMARY KEY ("tag_id", "movie_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_tags_tag" DROP CONSTRAINT "PK_bfa965ba5983753d13f538eb02b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_tags_tag" ADD CONSTRAINT "PK_62b97c8251a91e7943e00fa5964" PRIMARY KEY ("movie_id")`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_84841214027ea2bda39392e847"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_tags_tag" DROP COLUMN "tag_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_tags_tag" ADD "tag_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_tags_tag" DROP CONSTRAINT "PK_62b97c8251a91e7943e00fa5964"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_tags_tag" ADD CONSTRAINT "PK_bfa965ba5983753d13f538eb02b" PRIMARY KEY ("movie_id", "tag_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_04f1de63d2f065fd44d1a258bd" ON "tag_movies_movie" ("tag_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7dca074e4371db3dee0bd68735" ON "tag_movies_movie" ("movie_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_62b97c8251a91e7943e00fa596" ON "movie_tags_tag" ("movie_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_84841214027ea2bda39392e847" ON "movie_tags_tag" ("tag_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "record" ADD CONSTRAINT "FK_e7aa825cfdbab064be4fbedb085" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_movies_movie" ADD CONSTRAINT "FK_04f1de63d2f065fd44d1a258bd0" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_movies_movie" ADD CONSTRAINT "FK_7dca074e4371db3dee0bd68735b" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_tags_tag" ADD CONSTRAINT "FK_62b97c8251a91e7943e00fa5964" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_tags_tag" ADD CONSTRAINT "FK_84841214027ea2bda39392e847d" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movie_tags_tag" DROP CONSTRAINT "FK_84841214027ea2bda39392e847d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_tags_tag" DROP CONSTRAINT "FK_62b97c8251a91e7943e00fa5964"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_movies_movie" DROP CONSTRAINT "FK_7dca074e4371db3dee0bd68735b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_movies_movie" DROP CONSTRAINT "FK_04f1de63d2f065fd44d1a258bd0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "record" DROP CONSTRAINT "FK_e7aa825cfdbab064be4fbedb085"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_84841214027ea2bda39392e847"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_62b97c8251a91e7943e00fa596"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7dca074e4371db3dee0bd68735"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_04f1de63d2f065fd44d1a258bd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_tags_tag" DROP CONSTRAINT "PK_bfa965ba5983753d13f538eb02b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_tags_tag" ADD CONSTRAINT "PK_62b97c8251a91e7943e00fa5964" PRIMARY KEY ("movie_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_tags_tag" DROP COLUMN "tag_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_tags_tag" ADD "tag_id" integer NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_84841214027ea2bda39392e847" ON "movie_tags_tag" ("tag_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_tags_tag" DROP CONSTRAINT "PK_62b97c8251a91e7943e00fa5964"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_tags_tag" ADD CONSTRAINT "PK_bfa965ba5983753d13f538eb02b" PRIMARY KEY ("tag_id", "movie_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_tags_tag" DROP CONSTRAINT "PK_bfa965ba5983753d13f538eb02b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_tags_tag" ADD CONSTRAINT "PK_84841214027ea2bda39392e847d" PRIMARY KEY ("tag_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_tags_tag" DROP COLUMN "movie_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_tags_tag" ADD "movie_id" integer NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_62b97c8251a91e7943e00fa596" ON "movie_tags_tag" ("movie_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_tags_tag" DROP CONSTRAINT "PK_84841214027ea2bda39392e847d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_tags_tag" ADD CONSTRAINT "PK_bfa965ba5983753d13f538eb02b" PRIMARY KEY ("movie_id", "tag_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_movies_movie" DROP CONSTRAINT "PK_a5292f8c52f244ea420c34cfa10"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_movies_movie" ADD CONSTRAINT "PK_04f1de63d2f065fd44d1a258bd0" PRIMARY KEY ("tag_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_movies_movie" DROP COLUMN "movie_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_movies_movie" ADD "movie_id" integer NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7dca074e4371db3dee0bd68735" ON "tag_movies_movie" ("movie_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_movies_movie" DROP CONSTRAINT "PK_04f1de63d2f065fd44d1a258bd0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_movies_movie" ADD CONSTRAINT "PK_a5292f8c52f244ea420c34cfa10" PRIMARY KEY ("movie_id", "tag_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_movies_movie" DROP CONSTRAINT "PK_a5292f8c52f244ea420c34cfa10"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_movies_movie" ADD CONSTRAINT "PK_7dca074e4371db3dee0bd68735b" PRIMARY KEY ("movie_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_movies_movie" DROP COLUMN "tag_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_movies_movie" ADD "tag_id" integer NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_04f1de63d2f065fd44d1a258bd" ON "tag_movies_movie" ("tag_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_movies_movie" DROP CONSTRAINT "PK_7dca074e4371db3dee0bd68735b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_movies_movie" ADD CONSTRAINT "PK_a5292f8c52f244ea420c34cfa10" PRIMARY KEY ("tag_id", "movie_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie" DROP CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422"`,
    );
    await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "movie" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "movie" ADD CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_tags_tag" ADD CONSTRAINT "FK_62b97c8251a91e7943e00fa5964" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_movies_movie" ADD CONSTRAINT "FK_7dca074e4371db3dee0bd68735b" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "record" DROP COLUMN "movie_id"`);
    await queryRunner.query(
      `ALTER TABLE "record" ADD "movie_id" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "record" DROP CONSTRAINT "PK_192cc759287d532dab9b2896f0c"`,
    );
    await queryRunner.query(`ALTER TABLE "record" DROP COLUMN "record_id"`);
    await queryRunner.query(
      `ALTER TABLE "record" ADD "record_id" SERIAL NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "record" ADD CONSTRAINT "PK_192cc759287d532dab9b2896f0c" PRIMARY KEY ("record_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "record" ADD CONSTRAINT "FK_e7aa825cfdbab064be4fbedb085" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag" DROP CONSTRAINT "PK_8e4052373c579afc1471f526760"`,
    );
    await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "tag" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "tag" ADD CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_tags_tag" ADD CONSTRAINT "FK_84841214027ea2bda39392e847d" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_movies_movie" ADD CONSTRAINT "FK_04f1de63d2f065fd44d1a258bd0" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
