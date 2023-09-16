import { Query } from "mysql2/typings/mysql/lib/protocol/sequences/Query"
import { MigrationInterface, QueryRunner, Table} from "typeorm"

export class CreateUsersTable1694834624474 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '30',
                        isNullable: false
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        length: '30',
                        isNullable: false
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }

}
