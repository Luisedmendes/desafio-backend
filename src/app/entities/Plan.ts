import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import User from './User';

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

    @OneToMany(() => User, (user) => user.plan)
    users: User[];
}

export default Plan;


