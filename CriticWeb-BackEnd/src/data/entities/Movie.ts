import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Review } from "./Review";

@Entity()
class Movie {
  @PrimaryGeneratedColumn({ name: "movie_id" })
  movieId: number;

  @Column()
  title: string;

  @Column()
  category: string;

  @Column()
  image: string;

  @Column()
  description: string;

  @Column()
  year: number;

  // Relacionamento com Review (Um Movie tem muitas Reviews)
  @OneToMany(() => Review, (review) => review.movie)
  reviews: Review[];
}

export { Movie };
