import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ name: 'user', schema: 'public' })
export class User {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

}
