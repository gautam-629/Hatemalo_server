import { EntityTarget, ObjectLiteral, QueryRunner, SelectQueryBuilder } from "typeorm";
import { AppDataSource } from "../infrastructure/database/pgSql/data-source";

export class ORMHelper{
    static async createQueryBuilder(
        Entity: EntityTarget<ObjectLiteral>,
        Reference: string
    ): Promise<SelectQueryBuilder<any>> {
        const queryBuilder = AppDataSource.createQueryBuilder(
            Entity,
            Reference
        );
        return queryBuilder;
    }
    static createQueryRunner = async (): Promise<QueryRunner> => {
            const queryRunner: QueryRunner = AppDataSource.createQueryRunner();
            await queryRunner.connect();
            return queryRunner;
       
    };

   static async createTransaction():Promise<QueryRunner>{
         const queryRunner=AppDataSource.createQueryRunner();
         await queryRunner.connect()
         await queryRunner.startTransaction()
         return queryRunner;
    }

    static async commitTransaction(runner:QueryRunner):Promise<void>{
       await runner.commitTransaction();
       await runner.release()
    }
    static async rollBackTransaction(runner: QueryRunner): Promise<void> {
        await runner.rollbackTransaction();
        await runner.release();
    }
}