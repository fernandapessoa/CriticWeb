import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Movie } from "./Movie";

@Entity()
class Review {
  @PrimaryGeneratedColumn({ name: "review_id" })
  reviewId: number;

  @Column()
  description: string;

  @Column("float")
  rating: number;

  @Column({ name: "is_liked" })
  isLiked: boolean;

  @Column({ name: "user_id" })
  userId: number;

  @Column({ name: "movie_id" })
  movieId: number;

  // Relacionamento com User (Muitas reviews pertencem a um User)
  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: "user_id" }) // Especifica a coluna de junção para o relacionamento com User
  user: User;

  // Relacionamento com Movie (Muitas reviews pertencem a um Movie)
  @ManyToOne(() => Movie, (movie) => movie.reviews)
  @JoinColumn({ name: "movie_id" }) // Especifica a coluna de junção para o relacionamento com Movie
  movie: Movie;
}

export { Review };
