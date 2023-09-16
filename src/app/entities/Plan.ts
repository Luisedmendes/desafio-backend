import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
class Plan {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', {length: 100, nullable: false})
    name: string;

    @Column('varchar', {length: 100, nullable: false})
    description: string;

    @Column('varchar', {length: 100, nullable: false})
    price: number;
}

export default Plan;


