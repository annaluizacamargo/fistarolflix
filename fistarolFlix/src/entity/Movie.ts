import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Movie {

    @PrimaryGeneratedColumn('increment')
    id: number ;

    @Column({
        nullable: true
    })
    title: string;

    //TODO: change to id genre
    @Column({
        nullable: true
    })
    genres: string;

    @Column({
        nullable: true
    })
    duration: number;

    @Column({
        nullable: true
    })
    year: number;

    @Column({
        nullable: true
    })
    releaseDate: Date;

    @Column({
        nullable: true
    })
    trailerUrl: string;

    @Column({
        nullable: true
    })
    sinonpsis: string;

    @Column({
        nullable: true
    })
    posterUrl: string;

    @Column({
        nullable: true
    })
    ageRating: string;

}
