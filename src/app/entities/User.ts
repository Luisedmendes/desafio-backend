import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import Plan from './Plan';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', {length: 100, nullable: false})
    email: string

    @Column('varchar', {length: 100, nullable: false})
    password: string

    @ManyToOne(() => Plan, (plan) => plan.users)
    plan: Plan;

}

export default User;